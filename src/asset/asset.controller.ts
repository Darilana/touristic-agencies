import { Controller, NestInterceptor, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BasicAuthGuard } from '../auth/auth-basic.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import path from 'path'


@UseGuards(BasicAuthGuard)
@Controller('/api/asset')
export class AssetController {
  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: path.join(process.cwd(), 'uploads'),
      filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        callback(null, `${randomName}`)
      }
    })
  }) as unknown as NestInterceptor)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
    }
  }
}
