import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TicketDTO } from './dto/ticket.dto';
import { EventPattern } from '@nestjs/microservices';

@ApiTags('ticket')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'create ticket' })
  @Post('/ticket')
  async create(@Body() request: TicketDTO) {
    return await this.appService.create(request);
  }

  @EventPattern('payment_successed')
  async createTicket(data: { seatIds, name, phone, email, totalPrice, customerId }) {
    const ticket = await this.appService.create(data);
  }
}
