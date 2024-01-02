"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const room_controller_1 = require("./room.controller");
const meet_module_1 = require("../meet/meet.module");
const user_module_1 = require("../user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const position_schema_1 = require("./schemas/position.schema");
const room_gateway_1 = require("./room.gateway");
const history_schema_1 = require("./schemas/history.schema");
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            meet_module_1.MeetModule, user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([
                { name: position_schema_1.Position.name, schema: position_schema_1.PositionSchema },
                { name: history_schema_1.History.name, schema: history_schema_1.HistorySchema }
            ])
        ],
        providers: [room_service_1.RoomService, room_gateway_1.RoomGateway],
        controllers: [room_controller_1.RoomController]
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map