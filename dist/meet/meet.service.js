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
var MeetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const linkgenerator_helper_1 = require("./helpers/linkgenerator.helper");
const meetmessages_helper_1 = require("./helpers/meetmessages.helper");
const meet_schema_1 = require("./schemas/meet.schema");
const meetobject_schema_1 = require("./schemas/meetobject.schema");
let MeetService = MeetService_1 = class MeetService {
    constructor(model, objectModel, userService) {
        this.model = model;
        this.objectModel = objectModel;
        this.userService = userService;
        this.logger = new common_1.Logger(MeetService_1.name);
    }
    async getMeetsByUser(userId) {
        this.logger.debug('getMeetsByUser - ' + userId);
        return await this.model.find({ user: userId });
    }
    async createMeet(userId, dto) {
        this.logger.debug('createMeet - ' + userId);
        const user = await this.userService.getUserById(userId);
        const meet = Object.assign(Object.assign({}, dto), { user, link: (0, linkgenerator_helper_1.generateLink)() });
        const createdMeet = new this.model(meet);
        return await createdMeet.save();
    }
    async deleteMeetByUser(userId, meetId) {
        this.logger.debug(`deleteMeetByUser - ${userId} - ${meetId}`);
        return await this.model.deleteOne({ user: userId, _id: meetId });
    }
    async getMeetObjects(meetId, userId) {
        const user = await this.userService.getUserById(userId);
        const meet = await this.model.findOne({ user, _id: meetId });
        return await this.objectModel.find({ meet });
    }
    async getMeetById(meetId, userId) {
        const user = await this.userService.getUserById(userId);
        return await this.model.findOne({ user, _id: meetId });
    }
    async update(meetId, userId, dto) {
        this.logger.debug(`update - ${userId} - ${meetId}`);
        const user = await this.userService.getUserById(userId);
        const meet = await this.model.findOne({ user, _id: meetId });
        if (!meet) {
            throw new common_1.BadRequestException(meetmessages_helper_1.MeetMessagesHelper.UPDATE_MEET_NOT_FOUND);
        }
        meet.name = dto.name;
        meet.color = dto.color;
        await this.model.findByIdAndUpdate({ _id: meetId }, meet);
        await this.objectModel.deleteMany({ meet });
        let objectPayload;
        for (const object of dto.objects) {
            objectPayload = Object.assign({ meet }, object);
            await this.objectModel.create(objectPayload);
        }
    }
};
MeetService = MeetService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(meet_schema_1.Meet.name)),
    __param(1, (0, mongoose_1.InjectModel)(meetobject_schema_1.MeetObject.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService])
], MeetService);
exports.MeetService = MeetService;
//# sourceMappingURL=meet.service.js.map