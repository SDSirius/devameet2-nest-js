import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MeetModule } from 'src/meet/meet.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './schemas/position.schema';
import { RoomGateway } from './room.gateway';
import { History, HistorySchema } from './schemas/history.schema';

@Module({
  imports:[
    MeetModule, UserModule,
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema},
      { name: History.name, schema: HistorySchema}
    ])
  ],
  providers: [RoomService, RoomGateway],
  controllers: [RoomController]
})
export class RoomModule {}
