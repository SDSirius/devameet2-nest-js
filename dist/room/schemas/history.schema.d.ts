import mongoose, { HydratedDocument } from "mongoose";
import { Meet } from "src/meet/schemas/meet.schema";
import { User } from "src/user/schemas/user.schema";
export type HistoryDocument = HydratedDocument<History>;
export declare class History {
    meet: Meet;
    user: User;
    x: number;
    y: number;
}
export declare const HistorySchema: mongoose.Schema<History, mongoose.Model<History, any, any, any, mongoose.Document<unknown, any, History> & History & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, History, mongoose.Document<unknown, {}, mongoose.FlatRecord<History>> & mongoose.FlatRecord<History> & {
    _id: mongoose.Types.ObjectId;
}>;
