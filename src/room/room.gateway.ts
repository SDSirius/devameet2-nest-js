import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';
import { ToglMuteDto } from './dtos/toglMute.dto';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';

type ActiveSocketType = {
  room: string;
  id: string;
  userId: string;
}

type ActivePositionsType = { // setando um type pro meu array de posições... pra facilitar a visualização das salas pelo pado do servidor
  x:number;
  y:Number;
}

@WebSocketGateway({cors: true})
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {

  constructor(
    private readonly service: RoomService,
    private readonly userService: UserService,
    ) { }

  @WebSocketServer() wss: Server;

  private logger = new Logger(RoomGateway.name);
  private activeSockets: ActiveSocketType[] = [];
  private activePositions: ActivePositionsType[] = []; // setando meu array de posições 

  async handleDisconnect(client: any) {
    const existingOnSocket = this.activeSockets.find(
      socket => socket.id === client.id
    );

    if (!existingOnSocket) return;

    this.activeSockets = this.activeSockets.filter(
      socket => socket.id !== client.id
    );
    const userId = existingOnSocket.userId; // encontrando o Id do user
    const meet = existingOnSocket.room; // encontrando o link da room
    // console.log(` o nome da sala é "${meet}"`)
    // console.log(` o ID  do usuario é "${userId}"`)
    await this.service.saveOnLogout(userId, meet);
    await this.service.deleteUsersPosition(client.id);
    client.broadcast.emit(`${existingOnSocket.room}-remove-user`, { socketId: client.id });

    this.logger.debug(`Client: ${client.id} disconnected`);
  }

  afterInit(server: any) {
    this.logger.log('Gateway initialized');
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: JoinRoomDto) {
    const { link, userId } = payload;

    const existingOnSocket = this.activeSockets.find(
      socket => socket.room === link && socket.id === client.id);

    if (!existingOnSocket) {
      this.activeSockets.push({ room: link, id: client.id, userId });
      
      let x = 2; // alterei pra let pois não pode ser uma const
      let y = 2; // se for const os valores não poderão ser alterados (constante)
      
      const lastPosition = await this.service.lastValidPosition(userId, link);  // buscando ultimas posições validas... falta arrumar... tenho que buscar da table history mas preciso que ela funcione primeiro
      //console.log(`1 ====>x do lastPositions ${lastPosition.x}, y do lastPosition ${lastPosition.y}`)
      const loggedUsers = await this.service.listUsersPositionByLink(link);
      //console.log(`3 ====> ${loggedUsers}`);

      if (lastPosition){ // se tiver lastPosition carrega elas aqui antes de constituir o dto
        //console.log(lastPosition)
        x = lastPosition.x,
        y = lastPosition.y // até aqui a variavel lastPosition retorna null
        //console.log(`aqui esta carregando as posições do lastvalid sendo x =${lastPosition.x} e y = ${lastPosition.y}`)
      }

      //console.log(`x = ${x} e y = ${y}`);
      const dto = {
        link,
        userId,
        x: x,
        y: y,
        orientation: 'down'
      } as UpdateUserPositionDto
      
      loggedUsers.map(UserPosit =>{
        console.log(` Nome ${UserPosit.name},  x ${UserPosit.x}, y ${UserPosit.y}`);
        if(UserPosit.x === dto.x && UserPosit.y === dto.y){
          dto.x = Math.floor((Math.random() *8) +1); // o +1 impede que quebre a grade de 1 a 8 ja que o 
          dto.y = Math.floor((Math.random() *8) +1); // Math.random() retornaria um numero entre 0 e 1
        }                                            // multiplicando por 8 que é o max da grade da tela
      });
      x = dto.x;
      y = dto.y;
      this.activePositions.push({ x, y}); //inserindo as posições pra dentro do meu array como um objeto só
      // console.log(this.activePositions);
      // console.log(this.activeSockets);

      await this.service.updateUserPosition(client.id, dto);
      
    }

    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, { users });

    if (!existingOnSocket) {
      client.broadcast.emit(`${link}-add-user`, { user: client.id });
    }

    this.logger.debug(`Socket client: ${client.id} start to join room ${link}`);
  }

  @SubscribeMessage('move')
  async handleMove(client: Socket, payload: UpdateUserPositionDto) {
    const { link, userId, x, y, orientation } = payload;
    const zIndex = 4; // adicionando o zIndex pra poder tratar a colisão entre bonecos assim como mesas e vasos grandes
    const dto = {
      link,
      userId,
      x,
      y,
      zIndex, // declarando ele como atributo do usuario
      orientation
    } as UpdateUserPositionDto

    await this.service.updateUserPosition(client.id, dto);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, { users });
  }

  @SubscribeMessage('toggl-mute-user')
  async handleToglMute(_: Socket, payload: ToglMuteDto) {
    const { link } = payload;
    await this.service.updateUserMute(payload);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, { users });
  }

  @SubscribeMessage('call-user')
  async callUser(client: Socket, data: any) {
    this.logger.debug(`callUser: ${client.id} to: ${data.to}`);
    client.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: client.id
    });
  }

  @SubscribeMessage('make-answer')
  async makeAnswer(client: Socket, data: any) {
    this.logger.debug(`makeAnswer: ${client.id} to: ${data.to}`);
    client.to(data.to).emit('answer-made', {
      answer: data.answer,
      socket: client.id
    });
  }
}
