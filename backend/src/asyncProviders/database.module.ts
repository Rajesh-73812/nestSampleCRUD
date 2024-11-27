import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  providers: [DatabaseService], // Register DatabaseService as a provider
  exports: [DatabaseService], // Export DatabaseService to make it available to other modules
})
export class DatabaseModule {}
