"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RoomService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meet_schema_1 = require("../meet/schemas/meet.schema");
const meetobject_schema_1 = require("../meet/schemas/meetobject.schema");
const user_service_1 = require("../user/user.service");
const roommessages_helper_1 = require("./helpers/roommessages.helper");
const position_schema_1 = require("./schemas/position.schema");
const history_schema_1 = require("./schemas/history.schema");
const meet_service_1 = require("../meet/meet.service");
let RoomService = RoomService_1 = class RoomService {
    constructor(meetModel, objectModel, positionModel, historyModel, userService, meetService) {
        this.meetModel = meetModel;
        this.objectModel = objectModel;
        this.positionModel = positionModel;
        this.historyModel = historyModel;
        this.userService = userService;
        this.meetService = meetService;
        this.logger = new common_1.Logger(RoomService_1.name);
    }
    async getRoom(link) {
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
    async listUsersPositionByLink(link) {
        const meet = await this._getMeet(link);
        return await this.positionModel.find({ meet });
    }
    async deleteUsersPosition(clientId) {
        this.logger.debug(`deleteUsersPosition - ${clientId}`);
        return await this.positionModel.deleteMany({ clientId });
    }
    async updateUserPosition(clientId, dto) {
        this.logger.debug(`listUsersPositionByLink - ${dto.link}`);
        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId);
        if (!user) {
            throw new common_1.BadRequestException(roommessages_helper_1.RoomMessagesHelper.JOIN_USER_NOT_VALID);
        }
        const position = Object.assign(Object.assign({}, dto), { clientId,
            user,
            meet, name: user.name, avatar: user.avatar || 'avatar_01' });
        const usersInRoom = await this.positionModel.find({ meet });
        const loogedUserInRoom = usersInRoom.find(u => u.user.toString() === user._id.toString() || u.clientId === clientId);
        if (loogedUserInRoom) {
            await this.positionModel.findByIdAndUpdate({ _id: loogedUserInRoom._id }, position);
        }
        else {
            if (usersInRoom && usersInRoom.length > 10) {
                throw new common_1.BadRequestException(roommessages_helper_1.RoomMessagesHelper.ROOM_MAX_USERS);
            }
            ;
            await this.positionModel.create(position);
        }
    }
    async updateUserMute(dto) {
        this.logger.debug(`updateUserMute - ${dto.link} - ${dto.userId}`);
        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId);
        await this.positionModel.updateMany({ user, meet }, { muted: dto.muted });
    }
    async lastValidPosition(userId, link) {
        const user = await this.userService.getUserById(userId.toString());
        const meet = await this._getMeet(link);
        const validPosition = await this.historyModel.findOne({ meet: meet.id, user: user.id });
        if (validPosition) {
            const dto = {
                x: validPosition.x,
                y: validPosition.y
            };
            return dto;
        }
        const dto = {
            x: 2,
            y: 2
        };
        return dto;
    }
    async canGo(dto) {
        const { link, userId } = dto;
        const meet = await this._getMeet(link);
        let allObjects = [];
        let users, objects, objMatrix;
        const destination = {
            x: dto.x,
            y: dto.y
        };
        let meetObjects = [];
        meetObjects = await this.meetService.getMeetObjects(meet.id, userId);
        for (const object of meetObjects) {
            objects = {
                x: object.x,
                y: object.y,
                user: null,
                object: object._id.toString(),
                canPass: object.zIndex > 3 ? false : true
            };
            allObjects.push(objects);
            if (object.height > 1 || object.width > 1) {
                for (let startX = objects.x; startX < (objects.x + object.height); startX++) {
                    for (let startY = objects.y; startY < (objects.y + object.width); startY++) {
                        objMatrix = {
                            x: startX,
                            y: startY,
                            user: null,
                            object: `extends of ${object._id.toString()}`,
                            canPass: objects.canPass
                        };
                        if (objects.x !== startX || objects.y !== startY) {
                            allObjects.push(objMatrix);
                        }
                    }
                }
            }
        }
        const allUser = await this.listUsersPositionByLink(link);
        for (const user of allUser) {
            users = {
                x: user.x,
                y: user.y,
                user: user._id.toString(),
                object: null,
                canPass: false
            };
            allObjects.push(users);
        }
        this.logger.debug(`Can I Go There?`);
        let target = await allObjects.find(targetcell => targetcell.x == destination.x && targetcell.y == destination.y);
        console.log({ destination });
        console.log(target);
        console.log(target === null || target === void 0 ? void 0 : target.canPass);
        if (!target || (typeof (target)) === undefined || target.canPass !== false) {
            this.logger.debug(`Yes You Can!`);
            return true;
        }
        else {
            this.logger.debug(`No You Can't`);
            return false;
        }
    }
    async findInPosition(user, meet) {
        const positionSearch = await this.positionModel.findOne({ user: user, meet: meet });
        const dto = {
            x: positionSearch.x,
            y: positionSearch.y
        };
        return dto;
    }
    async saveOnLogout(userId, link) {
        const user = await this.userService.getUserById(userId);
        const meet = await this._getMeet(link);
        const meetId = meet.id;
        const positionRecord = await this.findInPosition(userId, meetId);
        const record = {
            user: userId,
            meet: meetId,
            x: positionRecord.x,
            y: positionRecord.y
        };
        const savedOnHistory = await this.historyModel.findOne({ user: user.id, meet: meet.id });
        if (!savedOnHistory) {
            await this.historyModel.create(record);
        }
        else {
            await this.historyModel.findByIdAndUpdate(savedOnHistory.id, record);
        }
    }
    async _getMeet(link) {
        const meet = await this.meetModel.findOne({ link });
        if (!meet) {
            throw new common_1.BadRequestException(roommessages_helper_1.RoomMessagesHelper.JOIN_LINK_NOT_VALID);
        }
        return meet;
    }
};
RoomService = RoomService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(meet_schema_1.Meet.name)),
    __param(1, (0, mongoose_1.InjectModel)(meetobject_schema_1.MeetObject.name)),
    __param(2, (0, mongoose_1.InjectModel)(position_schema_1.Position.name)),
    __param(3, (0, mongoose_1.InjectModel)(history_schema_1.History.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService,
        meet_service_1.MeetService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map