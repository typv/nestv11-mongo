import * as winston from 'winston';
import chalk from 'chalk';
import { WinstonModuleOptions } from 'nest-winston';
import { getAppConfig } from 'src/config';

export const getWinstonConfig = (appName: string): WinstonModuleOptions => {
  const { nodeEnv } = getAppConfig();

  const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ level: true, message: true }),
    winston.format.json(),
    winston.format.printf((info) => {
      const { level, message, timestamp, context: ctx, error: err, ...metadata } = info;
      const appPrefix = chalk.blue(`[${appName}]`);
      const context = chalk.cyan(`[${ctx || 'Application'}]`);

      const error = info.error;
      let errorOutput = '';
      if (err instanceof Error) {
        errorOutput = `\n\t${chalk.red(err)}`;
      }

      let metadataOutput = '';
      if (Object.keys(metadata).length > 0) {
        // Format metadata nicely for console
        if (nodeEnv === 'production') {
          // Compact format for production
          metadataOutput = ` | ${Object.entries(metadata)
            .map(([key, value]) => `${key}: ${value}`)
            .join(' | ')}`;
        } else {
          // Pretty format for development
          metadataOutput = ` ${chalk.white(JSON.stringify(metadata))}`;
        }
      }

      if (info.message) {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${info.message} ${metadataOutput} ${errorOutput}`;
      } else {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${JSON.stringify(info)}`;
      }
    }),
  );

  return {
    transports: [
      // Console transport
      new winston.transports.Console({
        level: nodeEnv === 'production' ? 'info' : 'debug',
        format: consoleFormat,
        handleExceptions: true,
      }),
    ],
  };
};
