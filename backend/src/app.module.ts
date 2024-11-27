import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { LoggerService } from './customProviders/logger.service';
import { CustomLoggerService } from './customProviders/custom-logger.service';
import { DatabaseConfigFactory } from './customProviders/config/database.config.factory';
import { DatabaseModule } from './asyncProviders/database.module';
import { DatabaseService } from './asyncProviders/database.service';
import { ConfigModule } from '@nestjs/config';

@Module({

  // it is the common way to connectt with database
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: 'localhost',
  //     port: 3306,
  //     username: 'root',
  //     password: '1234',
  //     database: 'nestcrud',
  //     autoLoadEntities: true,
  //     synchronize: true, 
  //   }),
  //   UsersModule,
  //   CatsModule,
    
  // ],

  // it is another way means we can create a separate module for database connection use(Asynchronous providers)
  imports:[
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      imports:[DatabaseModule],
      useFactory:async (databaseService:DatabaseService)=>({
        type:'mysql',
        host:databaseService.getHost(),
        port:databaseService.getPort(),
        username:databaseService.getUsername(),
        password:databaseService.getPassword(),
        database:databaseService.getDatabaseName(),
        autoLoadEntities:true,
        synchronize:true
      }),
      inject:[DatabaseService]
    }),
    UsersModule
  ],

  providers:[],
  // used for custom provider(useclass)
  // providers: [
  //   {
  //     provide: LoggerService,
  //     useClass: CustomLoggerService,
  //   },
  //     // for registering custom provider(usefactory)
  //   {
  //     provide: 'DATABASE_CONFIG',
  //     useFactory: DatabaseConfigFactory,
  //   },
  //   // almost same  as useFactory as useValue
  // ]
})
export class AppModule {}