import UseCaseBase from '../../../Shared/application/UseCaseBase';
import UserId from '../../../Shared/domain/valueObject/UserId';
import User from '../../domain/models/User';
import IUserRepository from '../../domain/repository/UserRepository';

export default class FindUserByIdUseCase extends UseCaseBase<
  string,
  User | null
> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(input: string): Promise<User | null> {
    const id = UserId.create(input);
    const user = await this.userRepository.findById(id);
    return user;
  }
}
