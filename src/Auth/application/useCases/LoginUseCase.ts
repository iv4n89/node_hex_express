import UseCaseBase from '../../../Shared/application/UseCaseBase';
import { IUser } from '../../../User/application/UserModel';
import IUserRepository from '../../../User/domain/repository/UserRepository';
import UserEmail from '../../../User/domain/valueObject/UserEmail';
import IAuthRepository from '../../domain/repository/AuthRepository';
import Token from '../../domain/valueObject/token';

type LoginInput = {
  email: string;
  password: string;
};

type LoginOutput = {
  user: IUser;
  token: string;
};

export default class LoginUseCase extends UseCaseBase<LoginInput, LoginOutput> {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  override async execute(input: LoginInput): Promise<LoginOutput> {
    const { email, password } = input;

    const userEmail = UserEmail.create(email);
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) {
      throw new Error('User not found');
    }

    const userId = user.id;
    const storedPassword =
      await this.authRepository.getCredentialsByUserId(userId);
    if (!storedPassword || !storedPassword.verify(password)) {
      throw new Error('Invalid password');
    }

    const token = Token.generate({
      userId: userId.getValue(),
      email: user.email.getValue(),
    });

    return {
      user: user.toPrimitives(),
      token: token.getValue(),
    };
  }
}
