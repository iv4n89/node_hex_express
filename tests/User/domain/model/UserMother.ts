import User from '../../../../src/User/domain/models/User';
import { UserEmailMother } from '../valueObject/UserEmailMother';
import { UserIdMother } from '../valueObject/UserIdMother';
import { UserNameMother } from '../valueObject/UserNameMother';

export class UserMother {
  static generate(): User {
    return User.createWithoutId(
      UserNameMother.generate().getValue(),
      UserEmailMother.generate().getValue()
    );
  }

  static create(id: string, name: string, email: string): User {
    return User.create(
      UserIdMother.generate(),
      UserNameMother.create(name),
      UserEmailMother.create(email)
    );
  }

  static createWithId(id: string): User {
    return User.create(
      UserIdMother.create(id),
      UserNameMother.generate(),
      UserEmailMother.generate()
    );
  }

  static createWithName(name: string): User {
    return User.create(
      UserIdMother.generate(),
      UserNameMother.create(name),
      UserEmailMother.generate()
    );
  }

    static createWithEmail(email: string): User {
        return User.create(
        UserIdMother.generate(),
        UserNameMother.generate(),
        UserEmailMother.create(email)
        );
    }
}
