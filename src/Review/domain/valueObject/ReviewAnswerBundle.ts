import { ValueObject } from '../../../Shared/domain/valueObject/ValueObject';
import { IReviewAnswer } from '../models/ReviewAnswer';
import ReviewAnswer from './ReviewAnswer';
import ReviewComment from './ReviewComment';

export default class ReviewAnswerBundle extends ValueObject<
  Array<IReviewAnswer>
> {
  constructor(value: Array<IReviewAnswer>) {
    super(value);
    this.validate(value);
  }

  validate(value: Array<IReviewAnswer>): void {
    if (!Array.isArray(value)) {
      throw new Error('Invalid value for ReviewAnswerBundle: must be an array');
    }
  }

  public static create(value: Array<IReviewAnswer>): ReviewAnswerBundle {
    return new ReviewAnswerBundle(value);
  }

  public addAnswer(
    id: number,
    answer: ReviewAnswer,
    comment: ReviewComment
  ): void {
    this.value.push({ id, answer, comment });
  }

  public getAnswers(): Array<IReviewAnswer> {
    return this.value;
  }
}
