import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, URL_CLIENT_DEV, URL_CLIENT_PRODUCT } = process.env;
  app.enableCors({
    origin: [URL_CLIENT_DEV, URL_CLIENT_PRODUCT],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(PORT, () =>
    console.log(`app is running with port: ${PORT}`),
  );
}
bootstrap();
