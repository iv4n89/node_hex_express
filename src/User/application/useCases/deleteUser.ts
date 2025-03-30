import IUserRepository from '../../domain/repository/UserRepository';
import UserId from '../../../Shared/domain/valueObject/UserId';
import UseCaseBase from '../../../Shared/application/UseCaseBase';

export default class DeleteUserUseCase extends UseCaseBase<string, boolean> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(input: string): Promise<boolean> {
    const id = UserId.create(input);
    return await this.userRepository.delete(id);
  }
}
