import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileService } from 'src/file-upload.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({ dest: './uploads' }), 
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UploadFileService], 
})
export class UsersModule {}
