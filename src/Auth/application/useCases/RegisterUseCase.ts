import UseCaseBase from '../../../Shared/application/UseCaseBase';
import User from '../../../User/domain/models/User';
import IUserRepository from '../../../User/domain/repository/UserRepository';
import UserEmail from '../../../User/domain/valueObject/UserEmail';
import IAuthRepository from '../../domain/repository/AuthRepository';
import AuthIsAdmin from '../../domain/valueObject/AuthIsAdmin';
import AuthPassword from '../../domain/valueObject/authPassword';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

type RegisterOutput = {
  success: boolean;
  message: string;
};

export default class RegisterUseCase extends UseCaseBase<
  RegisterInput,
  RegisterOutput
> {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  override async execute(input: RegisterInput): Promise<RegisterOutput> {
    const { name, email, password, isAdmin = false } = input;

    const userExists = await this.userRepository.existsByEmail(
      UserEmail.create(email)
    );

    if (userExists) {
      return {
        success: false,
        message: 'User already exists',
      };
    }

    const userCreated = await this.userRepository.save(
      User.createWithoutId(name, email)
    );
    if (!userCreated) {
      return {
        success: false,
        message: 'User creation failed',
      };
    }

    const user = await this.userRepository.findByEmail(UserEmail.create(email));
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const hashedPassword = AuthPassword.createHashed(password);
    const credentialsSaved = await this.authRepository.saveCredentials(
      user.id,
      hashedPassword,
      AuthIsAdmin.create(isAdmin)
    );
    if (!credentialsSaved) {
      return {
        success: false,
        message: 'Credentials saving failed',
      };
    }

    return {
      success: true,
      message: 'User registered successfully',
    };
  }
}
