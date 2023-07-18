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
        //this.logger.debug(`getRoom - ${link}`);

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
        //this.logger.debug(`listUsersPositionByLink - ${link}`);

        const meet = await this._getMeet(link);
        return await this.positionModel.find({meet});
    }

    async deleteUsersPosition(clientId: string){
        //this.logger.debug(`deleteUsersPosition - ${clientId}`);
        return await this.positionModel.deleteMany({clientId});
    }

    async updateUserPosition(clientId: string, dto : UpdateUserPositionDto){
        //this.logger.debug(`listUsersPositionByLink - ${dto.link}`);

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

        console.log(user.name, meet.link); // check para ver se os dados conferem

        const validPosition = await this.historyModel.find({ userId, link: meet });
        console.log(` ultima posição valida em validPosition do History =${validPosition}`) // check para ver se os dados conferem
        if (validPosition){
            console.log(`1º ValidPositions ====> ${validPosition}`); // modificar aqui para retornar os parametros iniciais
            // const dto = { // dto que contem os valores padrão
            //     x: validPositions.x,
            //     y: validPositions.y
            // } as PositionDocument;
            
            return //dto             //só criar um dto x e y vindo do validPosition
        }
        const dto = { // dto que contem os valores padrão
            x:2,
            y:2
        } as PositionDocument;
        return dto;                                                                                                                                                                                                                                                                                            
    }

    async findInPosition(user: string,meet:string){ // custom function criada pra obter os valores da Table Position
        const positionSearch = await this.positionModel.find({user:user,meet:meet});
        // console.log(user);
        // console.log(meet);
        console.log(typeof(positionSearch));
        console.log(`o position search retornou ${positionSearch}`);
        console.log(positionSearch.x)
        const dto = {  // o erro está aqui... não consigo achar como manipular os dados dessa variavel positionSearch
            //x:positionSearch.x, 
            //y:positionSearch.y
        } as PositionDocument;
        return dto
    }

    async saveOnLogout(userId:string,link:string){ // função para salvar ao deslogar
        const user = await this.userService.getUserById(userId); // buscando o objeto usuario com base no ID recebido
        const meet = await this._getMeet(link); //  buscando o objeto sala com base no link recebido
        const meetId = meet.id; // isolando o ID da sala para inserir no db e na custom function, nao aceitava meet.id

        console.log(`o objeto Usuario do ${userId} é ${user}`);  // teste
        console.log(`o objeto Room do ${link} é ${meet}`); // teste
        // console.log(`o ID da Room do ${link} é ${meet.id}`); // teste
        const positionRecord = await this.findInPosition(userId, meetId); // chamando a custom function
        console.log({positionRecord}); // teste
        const record = { //criando o objeto que vai pra Table History
            user: userId,
            meet: meetId,
            x :positionRecord.x ,  // buscar da positionModel check
            y: positionRecord.y // buscar da positionModel check
        }
        console.log(`o registro a salvar é ${record}`); // teste 
        const savedOnHistory = await this.historyModel.findOne(user.id, meet.id); // Objt da table - Find Many
        console.log(savedOnHistory); // teste 

        if(!savedOnHistory){
            await this.historyModel.create(record) //se não, Salva
        }else{
            await this.historyModel.findByIdAndUpdate(savedOnHistory.id, record) // se sim, atualiza
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

