import { ValueObject } from '../../../Shared/domain/valueObject/ValueObject';

export default class ReviewAnswer extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
    this.validate(value);
  }

  validate(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw new Error('Invalid value for ReviewAnswer: must be a boolean');
    }
  }

  public static create(value: boolean): ReviewAnswer {
    return new ReviewAnswer(value);
  }
}
