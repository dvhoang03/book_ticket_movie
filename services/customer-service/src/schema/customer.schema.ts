import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>

@Schema()
export class Customer {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    phone: string
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
