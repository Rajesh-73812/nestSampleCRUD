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
    // Create the logs directory if it doesn't exist
    const logDirectory = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });  // Create the directory with recursive option
    }

    const transport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-app.log',       // Location for log files
      datePattern: 'YYYY-MM-DD',              // Log file name pattern
      level: 'info',                          // Minimum log level
      maxSize: '20m',                         // Max log file size before rotation
      maxFiles: '14d',                        // Keep logs for 14 days
    });

    this.logger = winston.createLogger({
      level: 'info',                         // Set default log level
      transports: [
        new winston.transports.Console(),     // Log to the console
        transport,                            // Log to rotating files
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
