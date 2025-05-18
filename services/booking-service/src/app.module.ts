import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet'; // Gói tương thích mới hơn
import * as redisStorePackage from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStorePackage.redisStore,
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
        ttl: 600000000, // TTL (Time to Live) 60 giây
      })
    }),

    ClientsModule.register([
      {
        name: 'RABBITMQ_CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'customer_queue',
          queueOptions: {
            durable: true
          }
        }
      },
      {
        name: 'RABBITMQ_SEAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'seat_queue',
          queueOptions: {
            durable: true,
          },
          exchange: 'seat_exchange', // Thêm exchange
          routingKey: 'lock_seat',  // Thêm routing key
          // persistent: true,
        },
      },
      {
        name: 'RABBITMQ_TICKET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'ticket_queue',
          queueOptions: {
            durable: true,
          }
        },
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}


