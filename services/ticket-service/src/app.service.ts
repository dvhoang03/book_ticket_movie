import { Injectable } from '@nestjs/common';
import { Ticket } from './schema/ticket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketDTO } from './dto/ticket.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Ticket.name) private cinemaModel: Model<Ticket>,
  ) { }

  async findAll(): Promise<Ticket[]> {
    return await this.cinemaModel.find().exec();
  }

  async create(cinemaDTO: TicketDTO): Promise<Ticket> {
    const cinemaCreated = new this.cinemaModel(cinemaDTO);
    return await cinemaCreated.save();
  }
}
