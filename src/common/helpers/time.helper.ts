import { validate } from 'class-validator';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';
import dayjs from 'dayjs';
import { classValidatorExceptionFactory } from 'src/pipes';

export const delayUtil = (to: Date | number, from: Date | number = Date.now()): number => {
  return dayjs(to).diff(from);
};
