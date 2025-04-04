import UserId from '../../../Shared/domain/valueObject/UserId';
import AuthUser from '../../domain/models/AuthUser';
import IAuthRepository from '../../domain/repository/AuthRepository';
import AuthPassword from '../../domain/valueObject/authPassword';
import Token from '../../domain/valueObject/token';
import { AuthModel } from '../models/AuthModel';
import toMongoModel from '../toMongoModel';

export default class AuthRepository implements IAuthRepository {
  constructor() {}

  async saveCredentials(
    userId: UserId,
    password: AuthPassword
  ): Promise<boolean> {
    const authUser = AuthUser.createWithoutId(
      userId.getValue(),
      password.getValue()
    );
    const authUserMongoModel = toMongoModel(authUser);
    const storedPassword = await AuthModel.create(authUserMongoModel);
    const result = await storedPassword.save();
    return !!result;
  }

  async getCredentialsByUserId(userId: UserId): Promise<AuthPassword | null> {
    const userIdValue = userId.getValue();
    const authUserModel = await AuthModel.findOne({ userId: userIdValue });
    if (!authUserModel) {
      return null;
    }
    return AuthPassword.create(authUserModel.password);
  }

  async getToken(userId: UserId, password: AuthPassword): Promise<Token> {
    const authUserModel = await AuthModel.findOne({
      userId: userId.getValue(),
      password: password.getValue(),
    });
    if (!authUserModel) {
      throw new Error('Invalid credentials');
    }
    const token = Token.generate({ userId: userId.getValue() });
    if (!token) {
      throw new Error('Token generation failed');
    }
    return token;
  }

  async updatePassword(
    userId: UserId,
    newPassword: AuthPassword
  ): Promise<boolean> {
    const userIdValue = userId.getValue();
    const result = await AuthModel.updateOne(
      { userId: userIdValue },
      { password: newPassword.getValue() }
    );
    return result.modifiedCount === 1;
  }

  async refreshToken(userId: UserId, token: Token): Promise<Token> {
    const userIdValue = userId.getValue();
    const decryptedToken = Token.verify(token.getValue(), {
      userId: userId.getValue(),
    });
    if (!decryptedToken) {
      throw new Error('Invalid token');
    }
    const authUserModel = await AuthModel.findOne({ userId: userIdValue });
    if (!authUserModel) {
      throw new Error('User not found');
    }
    const newToken = Token.generate({ userId: userIdValue });
    if (!newToken) {
      throw new Error('Token generation failed');
    }
    return newToken;
  }
}
