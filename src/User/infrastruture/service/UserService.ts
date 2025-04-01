import IUserService from '../../application/service/IUserService';
import DeleteUserUseCase from '../../application/useCases/deleteUser';
import FindAllUsersUseCase from '../../application/useCases/findAllUsers';
import FindUserByIdUseCase from '../../application/useCases/findUserById';
import FindUserByNameUseCase from '../../application/useCases/findUserByName';
import { SaveUser } from '../../application/useCases/saveUser';
import UpdateUserUseCase from '../../application/useCases/updateUser';
import { IUser } from '../../application/UserModel';
import UserRepository from '../repository/UserRepository';
import toMongoModel from '../toMongoModel';

export default class UserService implements IUserService {
  private readonly saveUserUseCase: SaveUser;
  private readonly findUserByIdUseCase: FindUserByIdUseCase;
  private readonly findUserByNameUseCase: FindUserByNameUseCase;
  private readonly deleteUserUseCase: DeleteUserUseCase;
  private readonly updateUserUseCase: UpdateUserUseCase;
  private readonly findAllUsersUseCase: FindAllUsersUseCase;
  private readonly existsUserByIdUseCase: FindUserByIdUseCase;
  private readonly existsUserByNameUseCase: FindUserByNameUseCase;
  constructor() {
    const userRepository = new UserRepository();
    this.saveUserUseCase = new SaveUser(userRepository);
    this.findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
    this.findUserByNameUseCase = new FindUserByNameUseCase(userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(userRepository);
    this.findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
    this.existsUserByIdUseCase = new FindUserByIdUseCase(userRepository);
    this.existsUserByNameUseCase = new FindUserByNameUseCase(userRepository);
  }

  async save(name: string, email: string): Promise<boolean> {
    return await this.saveUserUseCase.execute(name, email);
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.findUserByIdUseCase.execute(id);
    if (!user) {
      return null;
    }
    return toMongoModel(user);
  }

  async findByName(name: string): Promise<IUser | null> {
    const user = await this.findUserByNameUseCase.execute(name);
    if (!user) {
      return null;
    }
    return toMongoModel(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.findUserByNameUseCase.execute(email);
    if (!user) {
      return null;
    }
    return toMongoModel(user);
  }

  async delete(id: string): Promise<boolean> {
    return await this.deleteUserUseCase.execute(id);
  }

  async update(id: string, name?: string, email?: string): Promise<boolean> {
    return await this.updateUserUseCase.execute(id, name, email);
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.findAllUsersUseCase.execute();
    return users.map((user) => toMongoModel(user));
  }

  async exists(id: string): Promise<boolean> {
    const user = await this.existsUserByIdUseCase.execute(id);
    return user !== null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.existsUserByNameUseCase.execute(email);
    return user !== null;
  }
}
