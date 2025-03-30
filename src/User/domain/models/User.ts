import UserEmail from '../valueObject/UserEmail';
import UserId from '../valueObject/UserId';
import UserName from '../valueObject/UserName';

export default class User {
  id: UserId;
  name: UserName;
  email: UserEmail;

  constructor(id: UserId, name: UserName, email: UserEmail) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public static create(id: UserId, name: UserName, email: UserEmail): User {
    return new User(id, name, email);
  }

  public static createFromPrimitives({
    id,
    name,
    email,
  }: {
    id: string;
    name: string;
    email: string;
  }): User {
    return new User(
      UserId.create(id),
      UserName.create(name),
      UserEmail.create(email)
    );
  }

  public static createWithoutId(name: string, email: string): User {
    return new User(
      UserId.generate(),
      UserName.create(name),
      UserEmail.create(email)
    );
  }

  public toPrimitives(): { id: string; name: string; email: string } {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
    };
  }
}
