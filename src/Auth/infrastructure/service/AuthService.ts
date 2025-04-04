import UserId from '../../../Shared/domain/valueObject/UserId';
import { IUser } from '../../../User/application/UserModel';
import UserEmail from '../../../User/domain/valueObject/UserEmail';
import UserRepository from '../../../User/infrastruture/repository/UserRepository';
import { IAuthServiceOutput } from '../../application/AuthModel';
import IAuthService from '../../application/service/IAuthService';
import ChangePasswordUseCase from '../../application/useCases/ChangePasswordUseCase';
import LoginUseCase from '../../application/useCases/LoginUseCase';
import RefreshTokenUseCase from '../../application/useCases/RefreshTokenUseCase';
import RegisterUseCase from '../../application/useCases/RegisterUseCase';
import Token from '../../domain/valueObject/token';
import AuthRepository from '../repository/AuthRepository';

export default class AuthService implements IAuthService {
  private readonly userRepository: UserRepository;
  private readonly loginUseCase: LoginUseCase;
  private readonly registerUseCase: RegisterUseCase;
  private readonly refreshTokenUseCase: RefreshTokenUseCase;
  private readonly changePasswordUseCase: ChangePasswordUseCase;
  constructor() {
    const authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
    this.loginUseCase = new LoginUseCase(authRepository, this.userRepository);
    this.registerUseCase = new RegisterUseCase(
      authRepository,
      this.userRepository
    );
    this.refreshTokenUseCase = new RefreshTokenUseCase(authRepository);
    this.changePasswordUseCase = new ChangePasswordUseCase(
      authRepository,
      this.userRepository
    );
  }

  async login(
    email: string,
    password: string
  ): Promise<IAuthServiceOutput | null> {
    const result = await this.loginUseCase.execute({ email, password });
    if (!result) {
      return null;
    }
    return result;
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<IAuthServiceOutput | null> {
    const result = await this.registerUseCase.execute({
      name,
      email,
      password,
    });
    if (!result) {
      return null;
    }
    const user = await this.userRepository.findByEmail(UserEmail.create(email));
    if (!user) {
      return null;
    }
    const token = Token.generate({ userId: user.id.getValue() });
    return {
      user: user.toPrimitives(),
      token: token.getValue(),
    };
  }

  async validateToken(token: string): Promise<IUser | null> {
    const userIdFromToken = Token.getPayload(token)?.userId;
    if (!userIdFromToken) {
      return null;
    }
    const validated = Token.verify(token, { userId: userIdFromToken });
    if (!validated) {
      return null;
    }

    const user = await this.userRepository.findById(
      UserId.create(userIdFromToken)
    );
    if (!user) {
      return null;
    }

    return user.toPrimitives();
  }

  async refreshToken(
    userId: string,
    token: string
  ): Promise<IAuthServiceOutput | null> {
    const result = await this.refreshTokenUseCase.execute({ userId, token });
    if (!result) {
      return null;
    }
    const user = await this.userRepository.findById(UserId.create(userId));
    if (!user) {
      return null;
    }
    return {
      user: user.toPrimitives(),
      token: result.token.getValue(),
    };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    const result = await this.changePasswordUseCase.execute({
      userId,
      oldPassword,
      newPassword,
    });
    if (!result) {
      return false;
    }
    return result.success;
  }
}
