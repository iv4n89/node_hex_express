import { UUIDValueObject } from '../../../Shared/domain/valueObject/UUIDValueObject';

export default class UserId extends UUIDValueObject {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  public static create(value: string): UserId {
    return new UserId(value);
  }

  public static generate(): UserId {
    return new UserId(UUIDValueObject.generate().getValue());
  }
}
