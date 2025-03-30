import UseCaseBase from '../../../Shared/application/UseCaseBase';
import IUserRepository from '../../domain/repository/UserRepository';
import UserEmail from '../../domain/valueObject/UserEmail';

export default class ExistsByEmailUseCase extends UseCaseBase<string, boolean> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  override async execute(input: string): Promise<boolean> {
    const email = UserEmail.create(input);
    return await this.userRepository.existsByEmail(email);
  }
}
