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
      storage: multer.memoryStorage(), // Use in-memory storage
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
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
  
    // Step 1: Validate file size (optional)
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      throw new BadRequestException('File size exceeds 2MB.');
    }
  
    // Step 2: Process the file with Sharp and save it
    const filename = `${path.parse(file.originalname).name}-${Date.now()}.webp`;
    const uploadPath = path.join(__dirname, '..', 'uploads', filename);
  
    try {
     
      await sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(uploadPath);
    } catch (error) {
      throw new BadRequestException('Error processing image.');
    }
  
    return filename;
  }
  
}
