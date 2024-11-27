import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  getHost(): string {
    return process.env.DATABASE_HOST || 'localhost';
  }

  getPort(): number {
    return parseInt(process.env.DATABASE_PORT, 10) || 3306;
  }

  getUsername(): string {
    return process.env.DATABASE_USER || 'root';
  }

  getPassword(): string {
    return process.env.DATABASE_PASSWORD || '1234';
  }

  getDatabaseName(): string {
    return process.env.DATABSE_NAME || 'nestcrud';
  }
}

