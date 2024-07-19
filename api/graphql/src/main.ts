import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as process from 'process';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  
  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3002', 'https://your-nextjs-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable CORS credentials (cookies, authorization headers, etc.)
  };
  
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  const PORT = process.env.PORT || 4000;
  
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
