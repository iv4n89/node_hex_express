import UseCaseBase from '../../../Shared/application/UseCaseBase';
import UserId from '../../../Shared/domain/valueObject/UserId';
import IUserRepository from '../../../User/domain/repository/UserRepository';
import IAuthRepository from '../../domain/repository/AuthRepository';
import AuthPassword from '../../domain/valueObject/authPassword';

interface Input {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

interface Output {
  success: boolean;
  message: string;
}

export default class ChangePasswordUseCase extends UseCaseBase<Input, Output> {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  override async execute(input: Input): Promise<Output> {
    const { newPassword, oldPassword, userId } = input;

    const user = await this.userRepository.findById(UserId.create(userId));
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const storedPassword = await this.authRepository.getCredentialsByUserId(
      UserId.create(userId)
    );
    if (!storedPassword) {
      return {
        success: false,
        message: 'User credentials not found',
      };
    }
    if (!storedPassword.verify(oldPassword)) {
      return {
        success: false,
        message: 'Old password is incorrect',
      };
    }

    const hashedPassword = AuthPassword.createHashed(newPassword);
    const passwordUpdated = await this.authRepository.updatePassword(
      UserId.create(userId),
      hashedPassword
    );

    if (!passwordUpdated) {
      return {
        success: false,
        message: 'Password update failed',
      };
    }

    return {
      success: true,
      message: 'Password updated successfully',
    };
  }
}
