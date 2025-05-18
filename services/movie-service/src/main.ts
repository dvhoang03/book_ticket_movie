import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie service')
    .setDescription('cung cap các dịch vụ về phim rạp')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, documentFactory);

  // const yamlSpec = yaml.dump(documentFactory);
  // // fs.mkdirSync('docs/api-specs', { recursive: true });  // Tạo thư mục nếu chưa có
  // fs.writeFileSync('../../docs/api-specs/movie-service.yaml', yamlSpec)

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
