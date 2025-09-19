import { registerAs } from '@nestjs/config';
import { APP_DEFAULTS } from 'src/common/constants';
import { NodeEnv } from 'src/common/enums';

export const getAppConfig = () => ({
  nodeEnv: process.env.NODE_ENV || NodeEnv.Local,
  appName: process.env.APP_NAME || APP_DEFAULTS.APP_NAME,
  appPort: +process.env.APP_PORT || APP_DEFAULTS.APP_PORT,
  isProductionEnv: process.env.NODE_ENV === NodeEnv.Development,
  frontendUrl: process.env.FRONTEND_URL,
});

export default registerAs('app', getAppConfig);
