import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument, Types } from "mongoose";
import * as dayjs from 'dayjs';

export type ShowtimeDoument = HydratedDocument<ShowTime>

@Schema()
export class ShowTime {
    @Prop({ type: Types.ObjectId, ref: 'Movie', required: true })
    movieId: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'Theater', required: true })
    theaterId: Types.ObjectId

    @Prop({ type: Date })
    time: Date
}

export const ShowTimeSchema = SchemaFactory.createForClass(ShowTime);