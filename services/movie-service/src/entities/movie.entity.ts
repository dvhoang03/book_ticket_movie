import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
    @Prop({ required: true })
    title: string

    @Prop()
    description: string

    @Prop()
    duration: string

    @Prop()
    posterUrl: string

    @Prop()
    genre: string

    @Prop()
    rating: string
}

export const MovieSchema = SchemaFactory.createForClass(Movie);