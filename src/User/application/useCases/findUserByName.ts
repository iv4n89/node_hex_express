import IUserRepository from '../../domain/repository/UserRepository';
import UserName from '../../domain/valueObject/UserName';
import UseCaseBase from '../../../Shared/application/UseCaseBase';
import { IUser } from '../UserModel';

export default class FindUserByNameUseCase extends UseCaseBase<
  string,
  IUser | null
> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(input: string): Promise<IUser | null> {
    const name = UserName.create(input);
    const user = await this.userRepository.findByName(name);
    return user;
  }
}
