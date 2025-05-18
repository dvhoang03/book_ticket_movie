import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation } from '@nestjs/swagger';
import { MovieDTO } from './movieDTO.dto';
import { Movie } from 'src/entities/movie.entity';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @ApiOperation({ summary: 'create 1 movie' })
  @Post()
  async create(@Body() request: MovieDTO): Promise<Movie> {
    return await this.movieService.create(request);
  }

  @ApiOperation({ summary: 'find All  movies' })
  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.movieService.findAll();
  }


}
