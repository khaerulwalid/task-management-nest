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
      // If you are using framework around express like [ NestJS or Apollo Serve ]
      // use this options overrideSendResponse to allow nestjs to handle response errors like throwing exceptions
      overrideSendResponse: false
    }) 
  );

  // Middleware graphql-upload
  // app.use(graphqlUploadExpress());

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new GraphQLExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
