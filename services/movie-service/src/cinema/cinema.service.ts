import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cinema } from 'src/entities/cinema.schema';
import { CinemaDTO } from './cinemaDTO.dto';

@Injectable()
export class CinemaService {
    constructor(
        @InjectModel(Cinema.name) private cinemaModel: Model<Cinema>,
    ) { }

    async findAll(): Promise<Cinema[]> {
        return await this.cinemaModel.find().exec();
    }

    async create(cinemaDTO: CinemaDTO): Promise<Cinema> {
        const cinemaCreated = new this.cinemaModel(cinemaDTO);
        return await cinemaCreated.save();
    }
}
