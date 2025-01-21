import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
