import { ValueObject } from '../../../Shared/domain/valueObject/ValueObject';

export default class UserEmail extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  override validate(value: string): void {
    if (!value.length) {
      throw new Error('Email cannot be empty.');
    }

    if (value.length < 5 || value.length > 50) {
      throw new Error('Email must be between 5 and 50 characters long.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format.');
    }
  }

  public static create(value: string): UserEmail {
    return new UserEmail(value);
  }
}
