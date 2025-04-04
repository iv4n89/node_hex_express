import { IAuthModel } from '../application/AuthModel';
import AuthUser from '../domain/models/AuthUser';

export default function toDomainModel(model: IAuthModel): AuthUser {
  return AuthUser.createFromPrimitives({
    id: model.id,
    userId: model.userId,
    password: model.password,
  });
}
