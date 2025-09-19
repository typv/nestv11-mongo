import * as Joi from 'joi';
import { JwtAlgorithm, NodeEnv } from 'src/common/enums';

export const validationSchema = Joi.object({
  //App config validation
  FRONTEND_URL: Joi.string().required(),

  //Google config validation
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_REDIRECT_URI: Joi.string().uri().required(),
  GOOGLE_WEBHOOK_BASE_URL: Joi.string().uri().required(),

  //Redis config validation
  REDIS_URL: Joi.string().uri().required(),

  //JWT config validation
  JWT_SECRET: Joi.string().required(),
  JWT_ALGORITHM: Joi.string()
    .valid(...Object.values(JwtAlgorithm))
    .default(JwtAlgorithm.HS256),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.when('NODE_ENV', {
    is: Joi.string().valid(NodeEnv.Production),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.when('NODE_ENV', {
    is: Joi.string().valid(NodeEnv.Production),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  //AWS SES config validation
  AWS_SES_SENDER: Joi.string().email().required(),
  AWS_SES_REGION: Joi.string().required(),
  AWS_SES_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SES_ACCESS_SECRET_ACCESS_KEY: Joi.string().required(),

  //AWS S3 config validation
  AWS_S3_REGION: Joi.string().required(),
  AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
  AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
  CLOUDFRONT_URL: Joi.string().uri().required(),
});
