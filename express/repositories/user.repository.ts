import { IUserEntity, UserRolesEnum } from "../types/IUserEntity";

export class UserRepository {

    private static users: IUserEntity[] = [
        {
            id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
            email: "luka@epam.com",
            password: "asdfasf$#12",
            role: UserRolesEnum.Admin
        },
    ]

    static findOne(id: string): IUserEntity | undefined {
        return this.users.find(user => user.id === id);
    }

}