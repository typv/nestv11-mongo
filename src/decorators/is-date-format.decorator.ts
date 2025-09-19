import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import dayjs from 'dayjs';

export function IsDateFormat(format: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [format],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          const date = dayjs(value, args.constraints[0], true);
          return date.isValid();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format ${args.constraints[0]}`;
        },
      },
    });
  };
}
