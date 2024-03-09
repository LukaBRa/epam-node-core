export enum UserRolesEnum {
    Admin = "admin",
    User = "user"
}

export interface IUserEntity {
    id: string,
    email: string,
    password: string,
    role: UserRolesEnum
}