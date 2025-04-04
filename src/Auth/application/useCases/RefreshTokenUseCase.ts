import UseCaseBase from '../../../Shared/application/UseCaseBase';
import UserId from '../../../Shared/domain/valueObject/UserId';
import IAuthRepository from '../../domain/repository/AuthRepository';
import Token from '../../domain/valueObject/token';

type RefreshTokenInput = {
  userId: string;
  token: string;
};

type RefreshTokenOutput = {
  token: Token;
};

export default class RefreshTokenUseCase extends UseCaseBase<
  RefreshTokenInput,
  RefreshTokenOutput
> {
  constructor(private readonly authRepository: IAuthRepository) {
    super();
  }

  override async execute(
    input: RefreshTokenInput
  ): Promise<RefreshTokenOutput> {
    const { userId, token } = input;

    const userStored = await this.authRepository.getCredentialsByUserId(
      UserId.create(userId)
    );
    if (!userStored) {
      throw new Error('User not found');
    }

    const isOldTokenValid = Token.verify(token, { userId });
    if (!isOldTokenValid) {
      throw new Error('Invalid token');
    }

    const tokenRefreshed = await this.authRepository.refreshToken(
      UserId.create(userId),
      Token.create(token)
    );
    if (!tokenRefreshed) {
      throw new Error('Token refresh failed');
    }
    return {
      token: tokenRefreshed,
    };
  }
}
