import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image', // Set resource_type to 'video' for audio files
          folder: 'images', // Optional: specify a folder
        },
        (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }).end(file.buffer);
    });
  }

  async uploadAudio(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'video', // Set resource_type to 'video' for audio files
          folder: 'audios', // Optional: specify a folder
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      ).end(file.buffer)
    });
  }}
