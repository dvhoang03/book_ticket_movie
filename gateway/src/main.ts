import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('gateway movie booking ticket') // Tiêu đề tài liệu API
    .setDescription('gateway to book ticke') // Mô tả API
    .setVersion('1.0') // Phiên bản API
    .build();

  // Tạo tài liệu API
  const document = SwaggerModule.createDocument(app, config);

  // Cấu hình Swagger UI, có thể truy cập tại /api
  SwaggerModule.setup('api', app, document);


  // const yamlSpec = yaml.dump(document);
  // // fs.mkdirSync('docs/api-specs', { recursive: true });  // Tạo thư mục nếu chưa có
  // fs.writeFileSync('../docs/api-specs/gateway.yaml', yamlSpec)
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
