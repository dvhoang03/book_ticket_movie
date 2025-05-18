import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CinemaDTO } from 'src/cinema/cinemaDTO.dto';
import { Theater } from 'src/entities/theater.schema';
import { TheaterDTO } from './theaterDTO.dto';

@Injectable()
export class TheaterService {
    constructor(
        @InjectModel(Theater.name) private theaterModel: Model<Theater>
    ) { }

    async findAll(cinemaId: string): Promise<Theater[]> {
        const query: any = {};
        if (cinemaId) {
            query.cinemaId = cinemaId;
        }
        return await this.theaterModel.find(query).exec();
    }

    async create(theaterDTO: TheaterDTO): Promise<Theater> {
        const theaterCreated = new this.theaterModel(theaterDTO);
        return await theaterCreated.save();
    }

}
