import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

/**
 * Decorator to safely transform a Mongoose ObjectId (or an object with a .toString() method)
 * into a plain string ID.
 * This is essential for handling _id fields when serializing Mongoose Documents.
 * It also handles cases where the field is already a string (e.g., from .lean()).
 */
export function ObjectIdToIdString(): PropertyDecorator {
  return Transform(({ value }) => {
    if (value === null || typeof value === 'undefined') {
      return value;
    }

    if (value instanceof Types.ObjectId) {
      return value.toString();
    }

    if (typeof value === 'object' && typeof value.toString === 'function') {
      return value.toString();
    }

    return value;
  });
}