import { Module } from '@nestjs/common';
import { TickerBookingController } from './ticker-booking.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TickerBookingController],
  providers: [],
})
export class TickerBookingModule { }
