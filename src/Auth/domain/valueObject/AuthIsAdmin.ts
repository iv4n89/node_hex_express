import { ValueObject } from '../../../Shared/domain/valueObject/ValueObject';

export default class AuthIsAdmin extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
    this.validate(value);
  }

  override validate(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw new Error('IsAdmin must be a boolean value');
    }
  }

  public static create(value: boolean): AuthIsAdmin {
    return new AuthIsAdmin(value);
  }

  public static createFromPrimitives(value: boolean): AuthIsAdmin {
    return new AuthIsAdmin(value);
  }

  public toPrimitives(): boolean {
    return this.value;
  }
}
