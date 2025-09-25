import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export const mongodbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://mongodb:27017/?replicaSet=dbrs'
};

export default registerAs('mongodb', () => mongodbConfig);
