import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { UploadImageSwagger } from './swagger/upload-image.swagger';
import { UploadService } from './upload.service';

import { TransformInterceptor } from '@common/interceptors/transform.interceptor';

@ApiTags('Upload')
@UseInterceptors(TransformInterceptor)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('images')
  @UploadImageSwagger()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.uploadService.uploadToStorage(file);
    return { url: imageUrl };
  }
}
