import UseCaseBase from '../../../Shared/application/UseCaseBase';
import User from '../../domain/models/User';
import IUserRepository from '../../domain/repository/UserRepository';

export default class FindAllUsersUseCase extends UseCaseBase<void, User[]> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
