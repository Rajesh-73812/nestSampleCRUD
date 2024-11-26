import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiOperation } from '@nestjs/swagger';
import { UploadFileService } from 'src/file-upload.service';
import { WinstonLoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadFileService: UploadFileService, 
    private readonly logger:WinstonLoggerService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    new UploadFileService().getFileInterceptor('profile'), 
  )
  async create(@Body() user: User, @UploadedFile() file: Express.Multer.File) {
    this.logger.log(`Received request to create user: ${user.name}`);
    const filename = await this.uploadFileService.validateAndProcessFile(file);
    // console.log(filename)
    user.profile = filename;
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
