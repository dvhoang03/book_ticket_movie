import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerDTO } from './dto/customer.dto';

@ApiTags('customer')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'create customer with name, email, phone' })
  @Post('/customer')
  async createCustomer(@Body() request: CustomerDTO) {
    return this.appService.create(request);
  }
}
