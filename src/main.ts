import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'node:fs';
import { stringify } from 'yaml';

const port = config().parsed?.PORT ? config().parsed?.PORT : 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service')
    .setVersion('1.0.1')
    .addServer(`http://localhost:${port}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlString: string = stringify(document, {});
  fs.writeFileSync('./doc/api.yaml', yamlString, {
    encoding: 'utf-8',
  });
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
