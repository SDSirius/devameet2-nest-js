import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Meet } from "src/meet/schemas/meet.schema";
import { User } from "src/user/schemas/user.schema";

export type HistoryDocument = HydratedDocument<History>

@Schema()
export class History {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Meet.name})
    meet: Meet;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
    user: User;
    @Prop({required: true})
    x:number;

    @Prop({required: true})
    y:number;
}

export const HistorySchema = SchemaFactory.createForClass(History);