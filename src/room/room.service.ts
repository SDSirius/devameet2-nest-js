import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meet, MeetDocument } from 'src/meet/schemas/meet.schema';
import { MeetObject, MeetObjectDocument } from 'src/meet/schemas/meetobject.schema';
import { UserService } from 'src/user/user.service';
import { ToglMuteDto } from './dtos/toglMute.dto';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';
import { RoomMessagesHelper } from './helpers/roommessages.helper';
import { Position, PositionDocument } from './schemas/position.schema';
import { History, HistoryDocument } from './schemas/history.schema';

@Injectable()
export class RoomService {
    private logger = new Logger(RoomService.name);

    constructor(
        @InjectModel(Meet.name) private readonly meetModel: Model<MeetDocument>,
        @InjectModel(MeetObject.name) private readonly objectModel: Model<MeetObjectDocument>,
        @InjectModel(Position.name) private readonly positionModel: Model<PositionDocument>,
        @InjectModel(History.name) private readonly historyModel: Model<HistoryDocument>, // injetando o modelo da history para a manipulação das entradas
        private readonly userService: UserService
    ) { }

    async getRoom(link: string) {
        this.logger.debug(`getRoom - ${link}`);

        const meet = await this._getMeet(link);
        const objects = await this.objectModel.find({ meet });
        return {
            link,
            name: meet.name,
            color: meet.color,
            objects
        };
    }

    async listUsersPositionByLink(link: string){
        this.logger.debug(`listUsersPositionByLink - ${link}`);

        const meet = await this._getMeet(link);
        return await this.positionModel.find({meet});
    }

    async deleteUsersPosition(clientId: string){
        this.logger.debug(`deleteUsersPosition - ${clientId}`);
        return await this.positionModel.deleteMany({clientId});
    }

    async updateUserPosition(clientId: string, dto : UpdateUserPositionDto){
        this.logger.debug(`listUsersPositionByLink - ${dto.link}`);

        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId);

        if(!user){
            throw new BadRequestException(RoomMessagesHelper.JOIN_USER_NOT_VALID);
        }

        const position = {
            ...dto,
            clientId,
            user,
            meet,
            name: user.name,
            avatar: user.avatar || 'avatar_01'
        }

        const usersInRoom = await this.positionModel.find({meet});

        const loogedUserInRoom = usersInRoom.find(u =>
            u.user.toString() === user._id.toString() || u.clientId === clientId);
        
        if(loogedUserInRoom){
            await this.positionModel.findByIdAndUpdate({_id: loogedUserInRoom._id},position);
        }else{
            if(usersInRoom && usersInRoom.length > 10){
                throw new BadRequestException(RoomMessagesHelper.ROOM_MAX_USERS);
            };

            await this.positionModel.create(position);
        }
    }

    async updateUserMute(dto:ToglMuteDto){
        this.logger.debug(`updateUserMute - ${dto.link} - ${dto.userId}`);

        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId);
        await this.positionModel.updateMany({user, meet}, {muted: dto.muted});
    }

    async lastValidPosition(userId, link:string): Promise<HistoryDocument | undefined>{ //criação da função que vai iniciar ao carregar
        const user = await this.userService.getUserById(userId.toString());
        const meet = await this._getMeet(link);
        const validPosition = await this.historyModel.findOne({ meet: meet.id, user: user.id });

        if (validPosition){
            const dto = { 
                x: validPosition.x,
                y: validPosition.y
            } as PositionDocument;
            return dto
        }

        const dto = { 
            x:2,
            y:2
        } as PositionDocument;
        return dto;                                                                                                                                                                                                                                                                                            
    }

    async findInPosition(user: string,meet:string){ 
        const positionSearch = await this.positionModel.findOne({user:user,meet:meet});

        const dto = {  
            x:positionSearch.x, 
            y:positionSearch.y
        } as PositionDocument;

        return dto
    }

    async saveOnLogout(userId:string,link:string){ 
        const user = await this.userService.getUserById(userId); 
        const meet = await this._getMeet(link); 
        const meetId = meet.id; 

        const positionRecord = await this.findInPosition(userId, meetId); 

        const record = { 
            user: userId,
            meet: meetId,
            x :positionRecord.x ,  
            y: positionRecord.y 
        }
        
        const savedOnHistory = await this.historyModel.findOne({user:user.id, meet: meet.id});

        if(!savedOnHistory){
            await this.historyModel.create(record) 
        }else{
            await this.historyModel.findByIdAndUpdate(savedOnHistory.id, record) 
        }
    }

    async _getMeet(link: string) {
        const meet = await this.meetModel.findOne({ link });
        if (!meet) {
            throw new BadRequestException(RoomMessagesHelper.JOIN_LINK_NOT_VALID);
        }

        return meet;
    }
}

