import { UUIDValueObject } from '../../../Shared/domain/valueObject/UUIDValueObject';

export default class QuestionId extends UUIDValueObject {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  static create(value: string): QuestionId {
    return new QuestionId(value);
  }

  static generate(): QuestionId {
    return QuestionId.create(super.generate().getValue());
  }
}
