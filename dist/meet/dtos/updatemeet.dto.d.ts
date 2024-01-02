import { CreateMeetDto } from "./createmeet.dto";
export declare class UpdateMeetDto extends CreateMeetDto {
    objects: Array<UpdateMeetObjectDto>;
}
export declare class UpdateMeetObjectDto {
    name: string;
    x: number;
    y: number;
    height: number;
    width: number;
    zIndex: number;
    orientation: string;
}
