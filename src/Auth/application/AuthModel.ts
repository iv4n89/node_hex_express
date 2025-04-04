import { IUser } from '../../User/application/UserModel';

export interface IAuthModel {
  id: string;
  userId: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAuthServiceOutput {
  user: IUser;
  token: string;
}
