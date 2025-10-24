import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import path from 'path';

export class S3ImageProvider {
  constructor() {
    this.region = process.env.AWS_REGION;
    this.bucketName = process.env.S3_BUCKET_NAME;

    this.client = new S3Client({
      credentials: {
        region: this.region,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async upload(userId, file) {
    const ext = path.extname(file.originalname);
    const key = `profiles/${userId}${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    try {
      await this.client.send(command);
      return key;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(key) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.client.send(command);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
