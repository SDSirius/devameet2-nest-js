import mongoose, { HydratedDocument } from "mongoose";
import { Meet } from "src/meet/schemas/meet.schema";
import { User } from "src/user/schemas/user.schema";
export type PositionDocument = HydratedDocument<Position>;
export declare class Position {
    meet: Meet;
    user: User;
    name: string;
    avatar: string;
    clientId: string;
    x: number;
    y: number;
    orientation: string;
    muted: boolean;
}
export declare const PositionSchema: mongoose.Schema<Position, mongoose.Model<Position, any, any, any, mongoose.Document<unknown, any, Position> & Position & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Position, mongoose.Document<unknown, {}, mongoose.FlatRecord<Position>> & mongoose.FlatRecord<Position> & {
    _id: mongoose.Types.ObjectId;
}>;
