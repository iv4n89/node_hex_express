import UseCaseBase from '../../../Shared/application/UseCaseBase';
import User from '../../domain/models/User';
import IUserRepository from '../../domain/repository/UserRepository';
import UserName from '../../domain/valueObject/UserName';

export default class FindUserByNameUseCase extends UseCaseBase<
  string,
  User | null
> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(input: string): Promise<User | null> {
    const name = UserName.create(input);
    const user = await this.userRepository.findByName(name);
    return user;
  }
}
