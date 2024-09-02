import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }).end(file.buffer);
    });
  }

  async uploadImageFromUrl(url: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(url, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
}
