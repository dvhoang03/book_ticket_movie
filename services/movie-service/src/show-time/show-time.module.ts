import { Module } from '@nestjs/common';
import { ShowTimeService } from './show-time.service';
import { ShowTimeController } from './show-time.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShowTime, ShowTimeSchema } from 'src/entities/showTime.schema';
import { Theater, TheaterSchema } from 'src/entities/theater.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShowTime.name, schema: ShowTimeSchema },
      { name: Theater.name, schema: TheaterSchema },
    ])
  ],
  controllers: [ShowTimeController],
  providers: [ShowTimeService],
})
export class ShowTimeModule { }
