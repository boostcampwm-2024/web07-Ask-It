import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  private readonly s3: S3Client;
  private readonly bucketName = 'ask-it-static';

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      endpoint: 'https://kr.object.ncloudstorage.com',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadToStorage(file: Express.Multer.File) {
    const key = `uploads/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    await this.s3.send(command);
    return `https://${this.bucketName}.kr.object.ncloudstorage.com/${key}`;
  }
}
