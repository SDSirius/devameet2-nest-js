import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';
import { ToglMuteDto } from './dtos/toglMute.dto';
import { Server, Socket } from 'socket.io';
export declare class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {
    private readonly service;
    constructor(service: RoomService);
    wss: Server;
    private logger;
    private activeSockets;
    handleDisconnect(client: any): Promise<void>;
    afterInit(server: any): void;
    handleJoin(client: Socket, payload: JoinRoomDto): Promise<void>;
    handleMove(client: Socket, payload: UpdateUserPositionDto): Promise<void>;
    handleToglMute(_: Socket, payload: ToglMuteDto): Promise<void>;
    callUser(client: Socket, data: any): Promise<void>;
    makeAnswer(client: Socket, data: any): Promise<void>;
}
