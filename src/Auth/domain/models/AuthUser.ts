import UserId from '../../../Shared/domain/valueObject/UserId';
import AuthId from '../valueObject/AuthId';
import AuthIsAdmin from '../valueObject/AuthIsAdmin';
import AuthPassword from '../valueObject/authPassword';

export default class AuthUser {
  id: AuthId;
  userId: UserId;
  password: AuthPassword;
  isAdmin?: AuthIsAdmin;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    id: AuthId,
    userId: UserId,
    password: AuthPassword,
    authIsAdmin?: AuthIsAdmin
  ) {
    this.id = id;
    this.userId = userId;
    this.password = password;
    this.createdAt = new Date();
    this.isAdmin = authIsAdmin || AuthIsAdmin.create(false);
  }

  public static create(
    id: AuthId,
    userId: UserId,
    password: AuthPassword
  ): AuthUser {
    return new AuthUser(id, userId, password);
  }

  public static createFromPrimitives({
    id,
    userId,
    password,
  }: {
    id: string;
    userId: string;
    password: string;
  }): AuthUser {
    return new AuthUser(
      AuthId.create(id),
      UserId.create(userId),
      AuthPassword.create(password)
    );
  }

  public static createWithoutId(userId: string, password: string): AuthUser {
    return new AuthUser(
      AuthId.generate(),
      UserId.create(userId),
      AuthPassword.create(password)
    );
  }

  public toPrimitives(): { id: string; userId: string; password: string } {
    return {
      id: this.id.getValue(),
      userId: this.userId.getValue(),
      password: this.password.getValue(),
    };
  }
}
