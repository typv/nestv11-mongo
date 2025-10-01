export interface uploadResponse {
  name: string,
  fileKey: string,
  extension: string,
}

export interface getObjectResponse {
  fileBuffer: Buffer,
}