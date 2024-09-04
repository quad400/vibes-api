import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'src/lib/common/utils/response';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @Post("image")
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    const result = await this.uploadService.uploadImage(file);
    const response = {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
    };
    return Response.success(response);
  }
  
  @Post("audio")
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadAudio(file);
    const response = {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    };
    return Response.success(response);
  }
}
