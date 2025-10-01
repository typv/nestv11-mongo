export class FileUtil {
  static isValidExtension(file: Express.Multer.File, allowExtensions: string[]): boolean {
    const fileExtension = file['originalName']?.split('.')?.pop()?.toLowerCase();
    return allowExtensions.includes(fileExtension);
  }
}