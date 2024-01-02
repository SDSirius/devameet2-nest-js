/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Meet, MeetDocument } from 'src/meet/schemas/meet.schema';
import { MeetObject, MeetObjectDocument } from 'src/meet/schemas/meetobject.schema';
import { UserService } from 'src/user/user.service';
import { ToglMuteDto } from './dtos/toglMute.dto';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';
import { Position, PositionDocument } from './schemas/position.schema';
import { HistoryDocument } from './schemas/history.schema';
import { MeetService } from 'src/meet/meet.service';
export declare class RoomService {
    private readonly meetModel;
    private readonly objectModel;
    private readonly positionModel;
    private readonly historyModel;
    private readonly userService;
    private readonly meetService;
    private logger;
    constructor(meetModel: Model<MeetDocument>, objectModel: Model<MeetObjectDocument>, positionModel: Model<PositionDocument>, historyModel: Model<HistoryDocument>, userService: UserService, meetService: MeetService);
    getRoom(link: string): Promise<{
        link: string;
        name: string;
        color: string;
        objects: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, MeetObject> & MeetObject & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, MeetObject> & MeetObject & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    listUsersPositionByLink(link: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Position> & Position & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Position> & Position & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    deleteUsersPosition(clientId: string): Promise<import("mongodb").DeleteResult>;
    updateUserPosition(clientId: string, dto: UpdateUserPositionDto): Promise<void>;
    updateUserMute(dto: ToglMuteDto): Promise<void>;
    lastValidPosition(userId: any, link: string): Promise<HistoryDocument | undefined>;
    canGo(dto: any): Promise<boolean>;
    findInPosition(user: string, meet: string): Promise<import("mongoose").Document<unknown, {}, Position> & Position & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    saveOnLogout(userId: string, link: string): Promise<void>;
    _getMeet(link: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Meet> & Meet & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Meet> & Meet & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
