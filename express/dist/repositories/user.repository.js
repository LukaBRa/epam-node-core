"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const IUserEntity_1 = require("../types/IUserEntity");
class UserRepository {
    static findOne(id) {
        return this.users.find(user => user.id === id);
    }
}
exports.UserRepository = UserRepository;
UserRepository.users = [
    {
        id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
        email: "luka@epam.com",
        password: "asdfasf$#12",
        role: IUserEntity_1.UserRolesEnum.Admin
    },
];
