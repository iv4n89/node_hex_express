import { IUser } from '../../application/UserModel';
import User from '../models/User';
import UserEmail from '../valueObject/UserEmail';
import UserId from '../../../Shared/domain/valueObject/UserId';
import UserName from '../valueObject/UserName';

export default interface IUserRepository {
  save(user: User): Promise<boolean>;
  findById(id: UserId): Promise<IUser | null>;
  findByEmail(email: UserEmail): Promise<IUser | null>;
  findByName(name: UserName): Promise<IUser | null>;
  delete(id: UserId): Promise<boolean>;
  update(user: User): Promise<boolean>;
  findAll(): Promise<IUser[]>;
  exists(id: UserId): Promise<boolean>;
  existsByEmail(email: UserEmail): Promise<boolean>;
}
