import { StringValueObject } from '../../../Shared/domain/valueObject/StringValueObject';

export default class UserName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  override validate(value: string): void {
    if (value.length < 3 || value.length > 20) {
      throw new Error('UserName must be between 3 and 20 characters long.');
    }
    if (!/^[a-zA-Z0-9_ ]+$/.test(value)) {
      throw new Error(
      'UserName can only contain letters, numbers, underscores, and spaces.'
      );
    }
  }

  public static create(value: string): UserName {
    return new UserName(value);
  }
}
