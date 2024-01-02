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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateMeetDto } from './dtos/createmeet.dto';
import { GetMeetDto } from './dtos/getmeet.dto';
import { UpdateMeetDto } from './dtos/updatemeet.dto';
import { MeetService } from './meet.service';
export declare class MeetController {
    private readonly service;
    constructor(service: MeetService);
    getUser(req: any): Promise<GetMeetDto[]>;
    getMeetById(req: any, params: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/meet.schema").Meet> & import("./schemas/meet.schema").Meet & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/meet.schema").Meet> & import("./schemas/meet.schema").Meet & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createMeet(req: any, dto: CreateMeetDto): Promise<void>;
    deleteMeet(req: any, params: any): Promise<void>;
    getObjectsByMeetId(req: any, params: any): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/meetobject.schema").MeetObject> & import("./schemas/meetobject.schema").MeetObject & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/meetobject.schema").MeetObject> & import("./schemas/meetobject.schema").MeetObject & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    updateMeet(req: any, params: any, dto: UpdateMeetDto): Promise<void>;
}
