import { StringValueObject } from '../../../Shared/domain/valueObject/StringValueObject';

export default class ReviewComment extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  override validate(value: string): void {
    if (typeof value !== 'string') {
      throw new Error('Invalid value for ReviewComment: must be a string');
    }
    if (!value.length) {
      throw new Error('Invalid value for ReviewComment: cannot be empty');
    }
  }

  public static create(value: string): ReviewComment {
    return new ReviewComment(value);
  }
}
