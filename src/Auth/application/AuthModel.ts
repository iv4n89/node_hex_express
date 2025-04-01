import { IUser } from "../../User/application/UserModel";
import Token from "../domain/valueObject/token";

export interface IAuthModel {
    id: string;
    userId: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IAuthServiceOutput {
    user: IUser;
    token: Token;
}
