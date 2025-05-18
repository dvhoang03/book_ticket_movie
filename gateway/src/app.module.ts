import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TickerBookingModule } from './ticker-booking/ticker-booking.module';

@Module({
  imports: [TickerBookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
