import { DatabaseConfig } from "./database.config";

export const DatabaseConfigFactory=(): DatabaseConfig=>{
    return {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT) || 3306,
      };
}