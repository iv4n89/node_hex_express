import { ValueObject } from './ValueObject';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

export class UUIDValueObject extends ValueObject<string> {
  constructor(value?: string) {
    if (!value) {
      value = uuidv4();
    }
    if (!validateUUID(value)) {
      throw new Error('Invalid UUID format');
    }
    super(value);
  }

  override validate(value: string): void {
    if (!this.isValidUUID(value)) {
      throw new Error('Invalid UUID format');
    }
  }

  isValidUUID(value: string): boolean {
    return validateUUID(value);
  }

  static generate(): UUIDValueObject {
    return new UUIDValueObject(uuidv4());
  }
}
