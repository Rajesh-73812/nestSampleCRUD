import { Injectable, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';

@Injectable()
export class UploadFileService {
  getFileInterceptor(fieldName: string) {
    return FileInterceptor(fieldName, {
      storage: multer.memoryStorage(), 
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            console.error('Unsupported file type:', file.mimetype);
            cb(new BadRequestException('Only image files are allowed!'), false);
        } else {
            cb(null, true);
        }
      },    
    });
  }

  async validateAndProcessFile(file?: Express.Multer.File): Promise<string> {
    if (!file) {
        throw new BadRequestException('File is required.');
    }

    if (file.size > 2 * 1024 * 1024) {
        throw new BadRequestException('File size exceeds 2MB.');
    }

    const filename = `${path.parse(file.originalname).name}-${Date.now()}.webp`;
    const uploadPath = path.join(__dirname, '..', 'uploads');
    const fullFilePath = path.join(uploadPath, filename);

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        // console.log('Uploads directory created:', uploadPath);
    }

    try {
        // console.log('Processing image...');
        await sharp(file.buffer)
            .webp({ quality: 80 })
            .toFile(fullFilePath);
        // console.log('Image processed successfully:', fullFilePath);
    } catch (error) {
        console.error('Error while processing image:', error);
        throw new BadRequestException('Error processing image.');
    }

    return filename; 
}

  
}
