import { StringValueObject } from '../../../Shared/domain/valueObject/StringValueObject';

export default class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  override validate(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format.');
    }
  }

  public static create(value: string): UserEmail {
    return new UserEmail(value);
  }
}
