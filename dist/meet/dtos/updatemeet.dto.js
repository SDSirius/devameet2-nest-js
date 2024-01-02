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
exports.UpdateMeetObjectDto = exports.UpdateMeetDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const meetmessages_helper_1 = require("../helpers/meetmessages.helper");
const createmeet_dto_1 = require("./createmeet.dto");
class UpdateMeetDto extends createmeet_dto_1.CreateMeetDto {
}
__decorate([
    (0, class_validator_1.IsArray)({ message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID }),
    (0, class_transformer_1.Type)(() => UpdateMeetObjectDto),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], UpdateMeetDto.prototype, "objects", void 0);
exports.UpdateMeetDto = UpdateMeetDto;
class UpdateMeetObjectDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID }),
    __metadata("design:type", String)
], UpdateMeetObjectDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Min)(0, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Max)(8, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateMeetObjectDto.prototype, "x", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Min)(0, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Max)(8, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateMeetObjectDto.prototype, "y", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "Tem que sem um numero" }),
    (0, class_validator_1.Min)(1, { message: "maior que 0" }),
    (0, class_validator_1.Max)(3, { message: "menor que 4" }),
    __metadata("design:type", Number)
], UpdateMeetObjectDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "Tem que sem um numero" }),
    (0, class_validator_1.Min)(1, { message: "maior que 0" }),
    (0, class_validator_1.Max)(3, { message: "menor que 4" }),
    __metadata("design:type", Number)
], UpdateMeetObjectDto.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_ZINDEX_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateMeetObjectDto.prototype, "zIndex", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: meetmessages_helper_1.MeetMessagesHelper.UPDATE_ORIENTATION_NOT_VALID }),
    __metadata("design:type", String)
], UpdateMeetObjectDto.prototype, "orientation", void 0);
exports.UpdateMeetObjectDto = UpdateMeetObjectDto;
//# sourceMappingURL=updatemeet.dto.js.map