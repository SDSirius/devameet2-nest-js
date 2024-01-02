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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const CryptoJS = require("crypto-js");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(dto) {
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();
        const createdUser = new this.userModel(dto);
        return createdUser.save();
    }
    async existsByEmail(email) {
        const result = await this.userModel.findOne({ email });
        if (result) {
            return true;
        }
        return false;
    }
    async getUserByLoginPassword(email, password) {
        const user = await this.userModel.findOne({ email });
        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.USER_CYPHER_SECRET_KEY);
            const savedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (password == savedPassword) {
                return user;
            }
        }
        return null;
    }
    async getUserById(id) {
        return await this.userModel.findById(id);
    }
    async updateUser(id, dto) {
        return await this.userModel.findByIdAndUpdate(id, dto);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map