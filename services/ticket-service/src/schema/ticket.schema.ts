import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ type: [String], required: true })
    seatIds: string[];  // Mảng các chuỗi ghế

    @Prop({ required: true })
    totalPrice: number;  // Tổng giá trị vé

    @Prop({ required: true })
    customerId: string;  // ID của khách hàng
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
