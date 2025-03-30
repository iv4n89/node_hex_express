import User from '../../domain/models/User';
import IUserRepository from '../../domain/repository/UserRepository';
import UserId from '../../../Shared/domain/valueObject/UserId';

export default class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, name?: string, email?: string): Promise<boolean> {
    const userId = UserId.create(id);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return false;
    }
    const updatedUser = User.createFromPrimitives({
      id,
      name: name || user.name,
      email: email || user.email,
    });
    return await this.userRepository.update(updatedUser);
  }
}
