import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BookingRequestDTO } from './dto/bookingDTO.dto';
import axios from 'axios';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject('RABBITMQ_SEAT_SERVICE') private readonly seatClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('RABBITMQ_TICKET_SERVICE') private readonly paymentClient: ClientProxy,
  ) { };




  async booking(request: BookingRequestDTO) {

    console.log("request", request)

    const { seatIds, name, phone, email } = request;

    console.log('bat dau check ghe');
    // Kiểm tra trạng thái của các ghế và lấy  về giá  vé
    const totalPrice = await this.checkSeatsStatus(seatIds);


    // Khoá ghế trong 10 phút
    const bookingId = `booking_${Date.now()}`;
    await this.lockSeats(bookingId, seatIds);


    console.log('bat dau cachce');
    // const totalPrice = 10000;
    await this.cacheManager.set(`${bookingId}`, { ...request, totalPrice: totalPrice }, 1000000);
    console.log('cache', await this.cacheManager.get(bookingId), bookingId);

    // Gọi dịch vụ thanh toán
    // return true;

    const url = await this.processPayment(bookingId, totalPrice);

    return {
      url: url,
      bookingId: bookingId
    };
  }


  // Kiểm tra trạng thái của ghế
  private async checkSeatsStatus(seatIds: string[]) {
    var price = 0;
    for (const item of seatIds) {
      // try {
      //const response = await axios.get(`http://localhost:3002/seats/seat/${item}/status`);
      const response = await axios.get(`http://seat-service:3002/seats/seat/${item}/status`);
      if (response.data.status !== 'AVAILABLE') {
        throw new BadRequestException(`Seat ID ${item} is already booked`);
      }
      price = price + response.data.price;
      // } catch (error) {
      //   this.handleError(error, item, 'Failed to check seat status');
      // }
    }
    return price
  }

  // Khoá ghế trong 10 phút
  private async lockSeats(bookingId: string, seatIds: string[]) {
    const lockTimeout = 10 * 60 * 1000; // 10 phút
    try {
      console.log('bat dau lockseat');
      const lockResponse = await lastValueFrom(
        this.seatClient.send({
          exchange: 'seat_exchange',
          routingKey: 'lock_seat'
        }, {
          bookingId,
          seatIds,
          expiresAt: 10,
        })
      );
      console.log(lockResponse)
      if (!lockResponse.status) {
        throw new BadRequestException('Failed to lock seats');
      }
    } catch (error) {
      throw new BadRequestException(`Failed to lock seats: ${error.message}`);
    }
  }

  // Xử lý thanh toán
  private async processPayment(bookingId: string, totalPrice: number) {
    try {
      const amount = totalPrice;
      console.log('bat dau payment');
      const response = await axios.get(`http://payment-service:3007/payment/vn-pay`, {
        params: {
          bookingId: bookingId,
          amount: amount
        }
      });
      return response.data.paymentUrl;
    } catch (error) {
      this.handleError(error, '', 'Failed to process payment');
    }
  }

  // Hàm xử lý lỗi chung
  private handleError(error: any, item: string, defaultMessage: string) {
    if (error.response && error.response.data) {
      throw new BadRequestException(error.response.data.message || `${defaultMessage}: ${item}`);
    } else {
      throw new BadRequestException(`${defaultMessage}: ${item}`);
    }
  }

}
