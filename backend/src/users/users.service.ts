import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { BadRequestException } from '@nestjs/common';
import { Multer } from 'multer';
import {WinstonLoggerService} from '../logger/logger.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger:WinstonLoggerService
  ) {}

  async create(user: User): Promise<User> {
    if (!user.profile) {
      throw new BadRequestException('Profile picture is required.');
    }
  
    const savedUser = await this.usersRepository.save(user);
    
    await this.saveToExcel(savedUser);
    this.logger.log('Creating a new user and inserted into excel sheet');
    return savedUser;
  }
  

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private async saveToExcel(user: User) {
    const filePath = 'users.xlsx';
    const workbook = new ExcelJS.Workbook();
    let sheet;

    if (fs.existsSync(filePath)) {
      
      await workbook.xlsx.readFile(filePath);
      sheet = workbook.getWorksheet('Users');
      if (!sheet) {
        sheet = this.createWorksheet(workbook);
      }
    } else {
      sheet = this.createWorksheet(workbook);
    }

    sheet.addRow({
      id: user.id,
      username: user.name,
      email: user.email,
    });

    await workbook.xlsx.writeFile(filePath);
  }

  private createWorksheet(workbook: ExcelJS.Workbook) {
    const sheet = workbook.addWorksheet('Users');
    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Username', key: 'username', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
    ];
    return sheet;
  }
}
