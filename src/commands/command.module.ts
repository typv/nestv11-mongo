import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestions } from './questions/create-admin.questions';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { mongodbConfiguration, validationSchema } from 'src/config';
import { User, UserSchema } from 'src/models';
import { Role, RoleSchema } from 'src/models/role.model';
import { CreateRolesCommand } from 'src/commands/create-roles.command';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
      validationOptions: {
        abortEarly: false,
      },
      load: [mongodbConfiguration],
    }),
    MongooseModule.forRootAsync({
      useFactory: (mongodbConfig: ConfigType<typeof mongodbConfiguration>) => {
        return { uri: mongodbConfig.uri };
      },
      inject: [mongodbConfiguration.KEY],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [
    CreateAdminCommand,
    CreateAdminQuestions,
    CreateRolesCommand
  ],
  exports: [],
})
export class CommandModule {}
