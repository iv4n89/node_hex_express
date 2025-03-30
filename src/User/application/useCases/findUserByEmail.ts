import User from '../../domain/models/User';
import IUserRepository from '../../domain/repository/UserRepository';
import UserEmail from '../../domain/valueObject/UserEmail';
import UseCaseBase from '../../../Shared/application/UseCaseBase';

export default class FindUserByEmailUseCase extends UseCaseBase<
  string,
  User | null
> {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async execute(input: string): Promise<User | null> {
    const email = UserEmail.create(input);
    return await this.userRepository.findByEmail(email);
  }
}
