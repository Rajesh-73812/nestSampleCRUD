import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
// import { LoggingInterceptor } from './logging/logging.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger configuration
  const config=new DocumentBuilder().setTitle('My Nest Api').setDescription('API Documentation for NestJs application').setVersion('1.0').addTag('cats').build();
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api-docs', app, document);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  // app.useGlobalInterceptors(new LoggingInterceptor(),new AuthInterceptor())
  await app.listen(3000);
}
bootstrap();
