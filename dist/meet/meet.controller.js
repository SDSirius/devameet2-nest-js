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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetController = void 0;
const common_1 = require("@nestjs/common");
const createmeet_dto_1 = require("./dtos/createmeet.dto");
const updatemeet_dto_1 = require("./dtos/updatemeet.dto");
const meet_service_1 = require("./meet.service");
let MeetController = class MeetController {
    constructor(service) {
        this.service = service;
    }
    async getUser(req) {
        const { userId } = req === null || req === void 0 ? void 0 : req.user;
        const result = await this.service.getMeetsByUser(userId);
        return result.map(m => ({
            id: m._id.toString(),
            name: m.name,
            color: m.color,
            link: m.link
        }));
    }
    async getMeetById(req, params) {
        const { userId } = req === null || req === void 0 ? void 0 : req.user;
        const { id } = params;
        return await this.service.getMeetById(id, userId);
    }
    async createMeet(req, dto) {
        const { userId } = req === null || req === void 0 ? void 0 : req.user;
        await this.service.createMeet(userId, dto);
    }
    async deleteMeet(req, params) {
        const { userId } = req === null || req === void 0 ? void 0 : req.user;
        const { id } = params;
        await this.service.deleteMeetByUser(userId, id);
    }
    async getObjectsByMeetId(req, params) {
        const { userId } = req === null || req === void 0 ? void 0 : req.user;
        const { id } = params;
        return await this.service.getMeetObjects(id, userId);
    }
    async updateMeet(req, params, dto) {
        const { userId } = req === null || req === void 0 ? void 0 : req.user;
        const { id } = params;
        await this.service.update(id, userId, dto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "getMeetById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createmeet_dto_1.CreateMeetDto]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "createMeet", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "deleteMeet", null);
__decorate([
    (0, common_1.Get)('objects/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "getObjectsByMeetId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, updatemeet_dto_1.UpdateMeetDto]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "updateMeet", null);
MeetController = __decorate([
    (0, common_1.Controller)('meet'),
    __metadata("design:paramtypes", [meet_service_1.MeetService])
], MeetController);
exports.MeetController = MeetController;
//# sourceMappingURL=meet.controller.js.map