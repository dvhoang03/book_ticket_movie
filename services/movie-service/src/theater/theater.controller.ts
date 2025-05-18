import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TheaterDTO } from './theaterDTO.dto';
import { Theater } from 'src/entities/theater.schema';

@Controller('theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) { }

  @ApiOperation({ summary: 'create theater' })
  @Post()
  async create(@Body() request: TheaterDTO): Promise<Theater> {
    return await this.theaterService.create(request);
  }

  @ApiOperation({ summary: 'find all theater of cinemaId' })
  @ApiQuery({ name: 'cinemaId', required: false })
  @Get('')
  async findAllOfCinemaId(@Query('cinemaId') cinemaId: string): Promise<Theater[]> {
    return await this.theaterService.findAll(cinemaId);
  }
}
