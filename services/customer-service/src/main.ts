import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('This API allows you to interact with the service. API service is hosted at http://localhost:3004')
    .setVersion('1.0')
    .addTag('customer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  // const yamlSpec = yaml.dump(document);
  // fs.writeFileSync('../../docs/api-specs/customer-service.yaml', yamlSpec)


  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();
