import { Readable } from 'stream';

export class FileUtil {
  static isValidExtension(file: Express.Multer.File, allowExtensions: string[]): boolean {
    const fileExtension = file['originalName']?.split('.')?.pop()?.toLowerCase();
    return allowExtensions.includes(fileExtension);
  }

  static async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}