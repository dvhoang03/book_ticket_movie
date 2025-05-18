import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Booking service')
    .setDescription('xử lí đặt vé')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, documentFactory);

  // const yamlSpec = yaml.dump(documentFactory);
  // fs.writeFileSync('../../docs/api-specs/booking-service.yaml', yamlSpec)

  //connect to microservice RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'payment_queue',
      queueOptions: {
        durable: true,
      },
      exchange: 'payment_status', // Thêm exchange
      exchangeType: 'topic',
      routingKey: 'payment',
    },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
