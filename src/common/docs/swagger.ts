import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getAppConfig } from '../../config';

export const setupSwagger = (app: INestApplication) => {
  const { appName, isProductionEnv } = getAppConfig();
  if (isProductionEnv) return;

  const config = new DocumentBuilder()
    .setTitle(`${appName} Documentation Swagger`)
    .setDescription(`${appName} Description`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    explorer: true,
    swaggerOptions: {
      customSiteTitle: `${appName} API Documentation`,
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
    },
  });
};
