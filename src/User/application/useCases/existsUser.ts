import UseCaseBase from '../../../Shared/application/UseCaseBase';
import IUserRepository from '../../domain/repository/UserRepository';
import UserId from '../../domain/valueObject/UserId';

export default class ExistsUserUseCase extends UseCaseBase<string, boolean> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(input: string): Promise<boolean> {
    const id = UserId.create(input);
    return await this.userRepository.exists(id);
  }
}
