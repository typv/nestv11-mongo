import { Readable, Writable } from 'node:stream';
import * as JSONStream from 'jsonstream';
import { pipeline } from 'node:stream/promises';

export class JsonStreamUtil {
  static async processJsonStreamSimple<T>(
    jsonStream: Readable,
  ): Promise<T> {
    const jsonParser = JSONStream.parse(null);
    let rootObject: T | null = null;

    const dataCollector = new Writable({
      objectMode: true,
      write: (dataChunk: T, encoding, callback) => {
        if (rootObject !== null) {
          callback(new Error("Invalid JSON"));
          return;
        }
        rootObject = dataChunk;
        callback();
      },
    });

    try {
      await pipeline(
        jsonStream,
        jsonParser,
        dataCollector
      );

      return rootObject;
    } catch (error) {
      throw error;
    }
  }
}