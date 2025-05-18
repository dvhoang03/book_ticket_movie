import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schema/customer.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để có thể sử dụng biến môi trường toàn cục
      envFilePath: '../../.env', // Đảm bảo rằng file .env được đọc
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI1,
      }),
    }),

    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }