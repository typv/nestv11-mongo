import * as bodyParser from 'body-parser';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import requestId from 'express-request-id';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { setupSwagger } from 'src/common/docs';
import { getWinstonConfig } from 'src/common/utilities';
import { PayloadValidationPipe } from 'src/pipes';
import { getAppConfig } from './config';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const { appName, appPort, isProductionEnv } = getAppConfig();
  const logger = WinstonModule.createLogger(getWinstonConfig(appName));

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const reflector = app.get(Reflector);

  app.use(helmet());
  app.enableCors();
  app.use(requestId());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.use(
  //   rateLimit({
  //     windowMs: 60 * 1000, // 1 minutes
  //     limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
  //     standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  //     legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  //   }),
  // );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new PayloadValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  setupSwagger(app);
  await app.listen(appPort);

  !isProductionEnv &&
    logger.log({
      message: `Application is ready. View Swagger at http://localhost:${appPort}/swagger`,
      context: 'Application',
    });
}

bootstrap();
