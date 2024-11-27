// src/common/logger/logger.service.ts

import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const logDirectory = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true }); 
    }

    const transport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-app.log',       
      datePattern: 'YYYY-MM-DD',              
      level: 'info',                          
      maxSize: '20m',                        
      maxFiles: '14d',                        
    });

    this.logger = winston.createLogger({
      level: 'info',                         
      transports: [
        new winston.transports.Console(),     
        transport,                            
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
