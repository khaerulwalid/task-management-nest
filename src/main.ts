import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLExceptionFilter } from './filters/all-exceptions.filter';
import './config/cloudinary.config';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(
    '/graphql',
    graphqlUploadExpress({ 
      maxFileSize: 10000000,
      maxFiles: 10,
      overrideSendResponse: false
    }) 
  );

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new GraphQLExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
