// src/common/logger/logger.module.ts

import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

@Module({
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService],  
})
export class LoggerModule {}
