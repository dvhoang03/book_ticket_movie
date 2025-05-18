import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ShowTimeService } from './show-time.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ShowTime } from 'src/entities/showTime.schema';
import { ShowTimeDTO } from './showTimeDTO.dto';

@Controller('show-time')
export class ShowTimeController {
  constructor(private readonly showTimeService: ShowTimeService) {
  }

  @ApiOperation({ summary: 'find showtime with cinemaId and movieId' })
  @ApiQuery({ name: 'movieId', example: '3213nnnn13n123', required: false })
  @ApiQuery({ name: 'cinemaId', example: '3213nnnn13n123', required: false })
  @Get()
  async getAll(
    @Query('movieId') movieId: string,  // Truyền movieId nếu có
    @Query('cinemaId') cinemaId: string,  // Truyền danh sách theaterIds nếu có):
  ): Promise<ShowTime[]> {
    return await this.showTimeService.getAll(movieId, cinemaId);
  }

  @ApiOperation({ summary: "create showtime" })
  @Post()
  async create(@Body() request: ShowTimeDTO): Promise<ShowTime> {
    return await this.showTimeService.create(request);
  }
}
