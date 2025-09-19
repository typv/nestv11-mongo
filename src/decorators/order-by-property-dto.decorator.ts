import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidationOptions } from 'class-validator';

export function TransformOrderBy(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  const decorators: PropertyDecorator[] = [];
  const transformToObject = Transform((params) => {

  });
  decorators.push(transformToObject);
  return applyDecorators(...decorators);
}
