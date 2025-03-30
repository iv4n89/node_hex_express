import UseCaseBase from '../../../Shared/application/UseCaseBase';
import IUserRepository from '../../domain/repository/UserRepository';
import { IUser } from '../UserModel';

export default class FindAllUsersUseCase extends UseCaseBase<void, IUser[]> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(): Promise<IUser[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
