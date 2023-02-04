import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service')
    .setVersion('1.0.1')
    .addServer(`http://localhost:${port}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
