import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { BookingRequestDTO } from './dto/bookingdto';
import axios from 'axios';

@Controller('ticker-booking')
export class TickerBookingController {
  constructor(private readonly httpService: HttpService) { }

  //lay danh sach phim
  @ApiOperation({ summary: 'find All  movies' })
  @Get('/movie')
  async findAllFilms() {
    const response = await lastValueFrom(this.httpService.get('http://movieservice:3001/movie'));
    console.log(response.data);
    return response.data
  }

  // lay danh sach rạp phim
  @ApiOperation({ summary: 'findAll cinema' })
  @Get('/cinema')
  async findAllCimemas() {
    const response = await lastValueFrom(this.httpService.get('http://movieservice:3001/cinema'))
    console.log(response.data)
    return response.data
  }

  //lay show time
  @ApiOperation({ summary: 'find showtime with cinemaId and movieId' })
  @ApiQuery({ name: 'movieId', example: '', required: false })
  @ApiQuery({ name: 'cinemaId', example: '', required: false })
  @Get('/showtime')
  async findShowtime(
    @Query('movieId') movieId: string,  // Truyền movieId nếu có
    @Query('cinemaId') cinemaId: string,  // Truyền danh sách theaterIds nếu có
  ) {
    // Thực hiện gọi API với các tham số truy vấn trong URL
    const response = await lastValueFrom(this.httpService.get('http://movieservice:3001/show-time', {
      params: {
        movieId: movieId,
        cinemaId: cinemaId
      }
    }));
    console.log(response.data);
    return response.data;
  }


  @ApiOperation({ summary: 'find seat with showtime id' })
  @ApiParam({ name: 'showtimeId', example: 'ab23bda', required: true })
  @Get('/seat/:showtimeId')
  async finseat(@Param('showtimeId') showtimeId: string) {
    const response = await lastValueFrom(this.httpService.get(`http://seat-service:3002/seats/seat/${showtimeId}`))
    console.log(response.data)
    return response.data;
  }

  @ApiOperation({ summary: 'xử lí yêu cầu đặt vé' })
  @Post('/booking')
  async get(@Body() request: BookingRequestDTO) {
    console.log(request);

    // Sửa lại cú pháp gọi API
    const response = await lastValueFrom(this.httpService.post('http://bookingservice:3005/booking', {
      seatIds: request.seatIds,
      email: request.email,
      name: request.name,
      phone: request.phone,
    }));

    return response.data;
  }




}
