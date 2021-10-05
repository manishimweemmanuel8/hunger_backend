import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;

  
  app.setGlobalPrefix('api/v1');
  SwaggerModule.setup('swagger', app, createDocument(app));
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Application listening on port ${port}`);

}

bootstrap();
