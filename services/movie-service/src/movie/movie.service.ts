import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/entities/movie.entity';
import { MovieDTO } from './movieDTO.dto';

@Injectable()
export class MovieService {

    constructor(
        @InjectModel(Movie.name) private movieModel: Model<Movie>,
    ) { }

    async create(movieDto: MovieDTO): Promise<Movie> {
        const moviecreated = new this.movieModel(movieDto);
        return await moviecreated.save();
    }

    async findAll(): Promise<Movie[]> {
        return await this.movieModel.find().exec();
    }



}
