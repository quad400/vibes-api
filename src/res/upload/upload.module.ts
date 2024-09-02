import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  exports: [UploadService],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
