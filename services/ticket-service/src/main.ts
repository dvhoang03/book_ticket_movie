import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('This API allows you to connect to tickerservice. API service is hosted at http://localhost:3003/api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  // const yamlSpec = yaml.dump(document);
  // fs.writeFileSync('../../docs/api-specs/ticker-service.yaml', yamlSpec);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'ticket_queue',
      queueOptions: {
        durable: true,
      },

    },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
