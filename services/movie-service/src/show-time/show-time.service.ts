import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShowTime } from 'src/entities/showTime.schema';
import { ShowTimeDTO } from './showTimeDTO.dto';
import { Theater } from 'src/entities/theater.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class ShowTimeService {
    constructor(
        @InjectModel(ShowTime.name) private showTimeModel: Model<ShowTime>,
        @InjectModel(Theater.name) private theaterModel: Model<Theater>,
    ) { }

    async create(request: ShowTimeDTO): Promise<ShowTime> {
        if (!dayjs(request.time).isValid()) {
            throw new BadRequestException('time is invalid');
        }
        request.time = dayjs(request.time).format('YYYY-MM-DD HH:mm:ss');
        const showtimCreated = new this.showTimeModel(request);
        return await showtimCreated.save()
    }

    async getAll(movieId: string, cinemaId: string): Promise<ShowTime[]> {
        // Tìm kiếm các buổi chiếu theo movieId hoặc cinemaId
        const query: any = {};

        // Nếu có movieId, thêm điều kiện vào query
        if (movieId) {
            query.movieId = movieId;
        }

        if (cinemaId) {
            const theaters = await this.theaterModel.find({ movieId: movieId }).exec();

            const theaterIds = theaters.map((item) => {
                return item._id
            })
            if (theaterIds && theaterIds.length > 0) {
                query.cinemaId = { $in: theaterIds };  // Tìm các showtime trong danh sách cinemaId (theaterIds)
            }
        }

        // Tìm kiếm tất cả showtimes với điều kiện trên
        return await this.showTimeModel.find(query).exec();
    }
}
