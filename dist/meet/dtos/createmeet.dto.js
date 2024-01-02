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
exports.CreateMeetDto = void 0;
const class_validator_1 = require("class-validator");
const meetmessages_helper_1 = require("../helpers/meetmessages.helper");
class CreateMeetDto {
}
__decorate([
    (0, class_validator_1.MinLength)(2, { message: meetmessages_helper_1.MeetMessagesHelper.CREATE_NAME_NOT_VALID }),
    __metadata("design:type", String)
], CreateMeetDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Matches)(/[0-9A-Fa-f]{3,6}/, { message: meetmessages_helper_1.MeetMessagesHelper.CREATE_COLOR_NOT_VALID }),
    __metadata("design:type", String)
], CreateMeetDto.prototype, "color", void 0);
exports.CreateMeetDto = CreateMeetDto;
//# sourceMappingURL=createmeet.dto.js.map