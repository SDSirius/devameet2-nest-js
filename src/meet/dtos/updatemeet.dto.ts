import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { MeetMessagesHelper } from "../helpers/meetmessages.helper";
import { CreateMeetDto } from "./createmeet.dto";


export class UpdateMeetDto extends CreateMeetDto {
    @IsArray({message: MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID})
    @Type(() => UpdateMeetObjectDto)
    @ValidateNested({each:true})
    objects: Array<UpdateMeetObjectDto>
}

export class UpdateMeetObjectDto {
    @IsNotEmpty({message: MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID})
    name:string;

    @IsNumber({},{message: MeetMessagesHelper.UPDATE_XY_NOT_VALID})
    @Min(0,{message: MeetMessagesHelper.UPDATE_XY_NOT_VALID})
    @Max(8,{message: MeetMessagesHelper.UPDATE_XY_NOT_VALID})
    x:number;

    @IsNumber({},{message: MeetMessagesHelper.UPDATE_XY_NOT_VALID})
    @Min(0,{message: MeetMessagesHelper.UPDATE_XY_NOT_VALID})
    @Max(8,{message: MeetMessagesHelper.UPDATE_XY_NOT_VALID})
    y:number;

    @IsOptional()
    @IsNumber({},{message: "Tem que ser um numero"})
    @Min(1,{message: "maior que 0"})
    @Max(3,{message: "menor que 4"})
    height?: number;

    @IsOptional()
    @IsNumber({},{message: "Tem que ser um numero"})
    @Min(1,{message: "maior que 0"})
    @Max(3,{message: "menor que 4"})
    width?: number;

    @IsNumber({},{message: MeetMessagesHelper.UPDATE_ZINDEX_NOT_VALID})
    zIndex:number;

    @IsString({message: MeetMessagesHelper.UPDATE_ORIENTATION_NOT_VALID})
    orientation:string;
}