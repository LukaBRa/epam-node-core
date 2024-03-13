
export enum UserRolesEnum {
    Admin = "admin",
    User = "user"
}

export interface IUserEntity {
    email: string,
    password: string,
    role: UserRolesEnum,
    createdAt: Date,
    updateAt: Date
}