import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up CORS middleware
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true, // enable credentials (cookies) cross-origin
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3333);
}
bootstrap();
