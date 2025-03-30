import { IUser } from '../application/UserModel';
import User from '../domain/models/User';

export default function toMongoModel(user: User): IUser {
  return user.toPrimitives();
}
