import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3002', 'https://tenderos-frontend-umohnyjl4q-ue.a.run.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable CORS credentials (cookies, authorization headers, etc.)
  };
  
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Marvel')
    .setDescription('Marvel Mock API')
    .setVersion('1.0')
    .addTag('marvel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();
