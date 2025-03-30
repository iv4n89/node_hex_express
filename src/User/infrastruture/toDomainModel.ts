import { IUser } from '../application/UserModel';
import User from '../domain/models/User';

export default function toDomainModel(user: IUser): User {
  return User.createFromPrimitives(user);
}
