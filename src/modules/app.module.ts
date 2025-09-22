import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import basicAuth from 'express-basic-auth';
import IORedis from 'ioredis';
import { WinstonModule } from 'nest-winston';
import { getWinstonConfig } from 'src/common/utilities';
import {
  appConfiguration,
  databaseConfiguration,
  mongodbConfiguration,
  validationSchema,
} from 'src/config';
import { AllExceptionFilter } from 'src/exceptions';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleBasedAccessControlGuard } from 'src/guards/rbac.guard';
import { HttpLoggerMiddleware } from 'src/middlewares';
import { AuthModule } from 'src/modules/auth';
import { AwsS3Module } from 'src/modules/base/aws-s3';
import { EmailModule } from 'src/modules/base/email';
import { FirebaseModule } from 'src/modules/base/firebase/firebase.module';
import { REDIS_CLIENT, RedisModule } from 'src/modules/base/redis';
import { UploadModule } from 'src/modules/upload';
import { UserModule } from 'src/modules/user';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
      validationOptions: {
        abortEarly: false,
      },
      load: [appConfiguration, databaseConfiguration, mongodbConfiguration],
    }),
    MongooseModule.forRootAsync({
      useFactory: (mongodbConfig: ConfigType<typeof mongodbConfiguration>) => {
        const uri = `mongodb://${mongodbConfig.username}:${mongodbConfig.password}@${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.database}?authSource=admin`;
        return { uri };
      },
      inject: [mongodbConfiguration.KEY],
    }),
    WinstonModule.forRootAsync({
      useFactory: (appConfig: ConfigType<typeof appConfiguration>) => {
        return getWinstonConfig(appConfig.appName);
      },
      inject: [appConfiguration.KEY],
    }),
    BullModule.forRootAsync({
      imports: [RedisModule],
      useFactory: (redisClient: IORedis) => ({
        connection: redisClient,
      }),
      inject: [REDIS_CLIENT],
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
      middleware: basicAuth({
        challenge: true,
        users: { admin: 'Sota@001' },
      }),
    }),
    AuthModule,
    RedisModule,
    EmailModule,
    UserModule,
    AwsS3Module,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleBasedAccessControlGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
