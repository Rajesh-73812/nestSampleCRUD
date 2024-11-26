// src/common/logger/logger.module.ts

import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

@Module({
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService],  // Export service so it can be injected in other modules
})
export class LoggerModule {}
