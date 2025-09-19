import { ERROR_RESPONSE } from 'src/common/constants';
import { NodeEnv } from 'src/common/enums';
import { ServerException } from 'src/exceptions';

export const EnvironmentLimit = (environments: NodeEnv[]) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const currentEnv = process.env.NODE_ENV as NodeEnv;

      if (!environments.includes(currentEnv)) {
        throw new ServerException({
          ...ERROR_RESPONSE.RESOURCE_FORBIDDEN,
          message: `This API is not available in ${currentEnv} environment`,
        });
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
};
