import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";

export type TheaterDocument = HydratedDocument<Theater>;

@Schema()
export class Theater {
    @Prop()
    name: string

    @Prop({ type: Types.ObjectId, ref: 'Cinema', required: true })
    cinemaId: Types.ObjectId;

}

export const TheaterSchema = SchemaFactory.createForClass(Theater);