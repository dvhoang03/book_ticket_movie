import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { BookingRequestDTO } from './dto/bookingDTO.dto';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
    @Inject('RABBITMQ_TICKET_SERVICE') private readonly paymentClient: ClientProxy,
    @Inject('RABBITMQ_CUSTOMER_SERVICE') private readonly customerClient: ClientProxy,
  ) { }

  @ApiOperation({ summary: 'xử lí yêu cấu đặt vé' })
  @Post('/booking')
  async get(@Body() request: BookingRequestDTO) {
    return this.appService.booking(request);
  }


  @EventPattern('payment')
  async handlePaymentSuccessed(data: { bookingId: string, status: any }) {
    console.log('Received payment event:', data);
    if (data.status === true || data.status === 'Success' || data.status === '00') {
      class DataCache {
        email: string;
        name: string
        phone: string
        totalPrice: number;
        seatIds: string[];
      }
      const dataCache = await this.cacheManager.get(data.bookingId) as DataCache;
      console.log('data cache', dataCache);
      const { seatIds, name, phone, email, totalPrice } = dataCache;

      try {
        // Gửi thông tin tạo khách hàng
        //const dataRespone = await lastValueFrom(this.customerClient.send('create_customer', { name, email, phone }));

        const response = await axios.post(`http://customer-service:3004/customer`,
          {
            email: email,
            phone: phone,
            name: name,
          }
        );
        console.log('Customer created with ID:', response.data);

        // Gửi sự kiện thanh toán thành công
        await this.paymentClient.emit('payment_successed', { ...dataCache, customerId: response.data._id });
        console.log('gui su kien thong bao mai. taoj ticker, event sent.');
      } catch (error) {
        console.error('Error while processing customer creation or payment event:', error);
      }

      //     // Gửi sự kiện thanh toán thành công
      //     await this.paymentClient.emit('payment_successed', { ...dataCache, customerId: dataRespone.customerId });
      //     console.log('Payment success event sent.');
      //   } catch (error) {
      //     console.error('Error while processing customer creation or payment event:', error);
      //   }

      // }
    }
  }


}