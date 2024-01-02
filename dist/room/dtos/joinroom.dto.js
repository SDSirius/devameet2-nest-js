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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRoomDto = void 0;
const class_validator_1 = require("class-validator");
const roommessages_helper_1 = require("../helpers/roommessages.helper");
class JoinRoomDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: roommessages_helper_1.RoomMessagesHelper.JOIN_USER_NOT_VALID }),
    __metadata("design:type", String)
], JoinRoomDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: roommessages_helper_1.RoomMessagesHelper.JOIN_LINK_NOT_VALID }),
    __metadata("design:type", String)
], JoinRoomDto.prototype, "link", void 0);
exports.JoinRoomDto = JoinRoomDto;
//# sourceMappingURL=joinroom.dto.js.map