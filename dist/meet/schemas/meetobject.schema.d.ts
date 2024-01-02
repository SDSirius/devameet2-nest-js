import mongoose, { HydratedDocument } from "mongoose";
import { Meet } from "./meet.schema";
export type MeetObjectDocument = HydratedDocument<MeetObject>;
export declare class MeetObject {
    meet: Meet;
    name: string;
    x: number;
    y: number;
    height: number;
    width: number;
    zIndex: number;
    orientation: string;
}
export declare const MeetObjectSchema: mongoose.Schema<MeetObject, mongoose.Model<MeetObject, any, any, any, mongoose.Document<unknown, any, MeetObject> & MeetObject & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MeetObject, mongoose.Document<unknown, {}, mongoose.FlatRecord<MeetObject>> & mongoose.FlatRecord<MeetObject> & {
    _id: mongoose.Types.ObjectId;
}>;
