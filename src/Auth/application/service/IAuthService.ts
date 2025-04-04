import { IUser } from '../../../User/application/UserModel';
import { IAuthServiceOutput } from '../AuthModel';

export default interface IAuthService {
  login(email: string, password: string): Promise<IAuthServiceOutput | null>;
  register(
    name: string,
    email: string,
    password: string
  ): Promise<IAuthServiceOutput | null>;
  validateToken(token: string): Promise<IUser | null>;
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean>;
  refreshToken(
    userId: string,
    token: string
  ): Promise<IAuthServiceOutput | null>;
}
