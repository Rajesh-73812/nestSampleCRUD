import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'nestcrud',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    CatsModule,
    
  ],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
// import { CatsModule } from './cats/cats.module';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb+srv://rajeshswain:Rajesh@7381@cluster0.iq8y5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
//     UsersModule,
//     CatsModule,
//   ],
// })
// export class AppModule {}