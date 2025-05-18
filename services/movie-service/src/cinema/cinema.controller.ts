import { Body, Controller, Get, Post } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { Cinema } from 'src/entities/cinema.schema';
import { ApiOperation } from '@nestjs/swagger';
import { CinemaDTO } from './cinemaDTO.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) { }

  @ApiOperation({ summary: 'findAll cinema' })
  @Get()
  async findAll(): Promise<Cinema[]> {
    return await this.cinemaService.findAll()
  }

  @ApiOperation({ summary: 'create cinema' })
  @Post()
  async create(@Body() request: CinemaDTO) {
    return await this.cinemaService.create(request);
  }



}
