import User from '../models/User';
import UserEmail from '../valueObject/UserEmail';
import UserId from '../../../Shared/domain/valueObject/UserId';
import UserName from '../valueObject/UserName';

export default interface IUserRepository {
  save(user: User): Promise<boolean>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findByName(name: UserName): Promise<User | null>;
  delete(id: UserId): Promise<boolean>;
  update(user: User): Promise<boolean>;
  findAll(): Promise<User[]>;
  exists(id: UserId): Promise<boolean>;
  existsByEmail(email: UserEmail): Promise<boolean>;
}
