import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Theater, TheaterSchema } from 'src/entities/theater.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Theater.name, schema: TheaterSchema }
    ])
  ],
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule { }
