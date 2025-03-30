import IUserRepository from '../../domain/repository/UserRepository';
import UserId from '../../domain/valueObject/UserId';
import UseCaseBase from '../../../Shared/application/UseCaseBase';
import { IUser } from '../UserModel';

export default class FindUserByIdUseCase extends UseCaseBase<
  string,
  IUser | null
> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(input: string): Promise<IUser | null> {
    const id = UserId.create(input);
    const user = await this.userRepository.findById(id);
    return user;
  }
}
