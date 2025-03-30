import User from '../../domain/models/User';
import IUserRepository from '../../domain/repository/UserRepository';

export class SaveUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(name: string, email: string): Promise<boolean> {
    const user = User.createWithoutId(name, email);
    return await this.userRepository.save(user);
  }
}
