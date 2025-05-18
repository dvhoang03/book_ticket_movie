import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schema/customer.schema';
import { Model } from 'mongoose';
import { CustomerDTO } from './dto/customer.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Customer.name) private cinemaModel: Model<Customer>,
  ) { }

  async findAll(): Promise<Customer[]> {
    return await this.cinemaModel.find().exec();
  }

  async create(cinemaDTO: CustomerDTO): Promise<Customer> {
    const cinemaCreated = new this.cinemaModel(cinemaDTO);
    return await cinemaCreated.save();
  }
}
