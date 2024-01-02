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
exports.UpdateUserPositionDto = void 0;
const class_validator_1 = require("class-validator");
const meetmessages_helper_1 = require("../../meet/helpers/meetmessages.helper");
const joinroom_dto_1 = require("./joinroom.dto");
class UpdateUserPositionDto extends joinroom_dto_1.JoinRoomDto {
}
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Min)(0, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Max)(8, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateUserPositionDto.prototype, "x", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Min)(0, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Max)(8, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateUserPositionDto.prototype, "y", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_ORIENTATION_NOT_VALID }),
    __metadata("design:type", String)
], UpdateUserPositionDto.prototype, "orientation", void 0);
exports.UpdateUserPositionDto = UpdateUserPositionDto;
//# sourceMappingURL=updateposition.dto.js.map