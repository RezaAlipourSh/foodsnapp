import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { extname } from "path";

@Injectable()
export class S3Service {
  private readonly s3: S3;
  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      endpoint: process.env.S3_ENDPOINT,
      region: "default",
    });
  }

  async uploadFile(file: Express.Multer.File, folderName: string) {
    const ext = extname(file.originalname);
    return await this.s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folderName}/${Date.now()}${ext}`,
        Body: file.buffer,
      })
      .promise();
  }

  async deleteFile(Key: string) {
    return await this.s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: decodeURI(Key),
      })
      .promise();
  }
}

//s3Client

// import {
//   GetObjectCommand,
//   PutObjectCommand,
//   S3,
//   S3Client,
// } from "@aws-sdk/client-s3";
// import { BadRequestException, Injectable } from "@nestjs/common";
// import { config } from "dotenv";
// import { extname } from "path";

// config();

// @Injectable()
// export class S3Service {
//   client = new S3Client({
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY,
//       secretAccessKey: process.env.S3_SECRET_KEY,
//     },
//     endpoint: process.env.S3_ENDPOINT,
//     region: "default",
//   });

//   async uploadFile(
//     file: Express.Multer.File,
//     folderName: string
//   ): Promise<any> {
//     const ext = extname(file.originalname);
//     try {
//       await this.client.send(
//         new PutObjectCommand({
//           Bucket: process.env.S3_BUCKET_NAME,
//           Key: `${folderName}/${Date.now()}${ext}`,
//           Body: file.buffer,
//         })
//       );
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   }

//   async command(file: Express.Multer.File, folderName: string): Promise<any> {
//     const ext = extname(file.originalname);
//     await new GetObjectCommand({
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: `${folderName}/${Date.now()}${ext}`,
//     });
//   }
// }
