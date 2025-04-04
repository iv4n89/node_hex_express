import { ValueObject } from '../../../Shared/domain/valueObject/ValueObject';
import bcrypt from 'bcrypt';

export default class AuthPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  override validate(value: string): void {
    if (value.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    if (!/[A-Z]/.test(value)) {
      throw new Error('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(value)) {
      throw new Error('Password must contain at least one lowercase letter.');
    }
    if (!/[0-9]/.test(value)) {
      throw new Error('Password must contain at least one number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      throw new Error('Password must contain at least one special character.');
    }
    if (value.includes(' ')) {
      throw new Error('Password must not contain spaces.');
    }
  }

  public getHashedPassword(): string {
    const saltRounds = 10;
    return bcrypt.hashSync(this.value, saltRounds);
  }

  public static comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  public static create(value: string): AuthPassword {
    return new AuthPassword(value);
  }

  public static createHashed(value: string): AuthPassword {
    const hashedPassword = new AuthPassword(value).getHashedPassword();
    return new AuthPassword(hashedPassword);
  }

  public verify(plainTextPassword: string): boolean {
    return bcrypt.compareSync(plainTextPassword, this.value);
  }
}
