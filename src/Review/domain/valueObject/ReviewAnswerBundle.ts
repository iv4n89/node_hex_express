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

  validate(
    value: Array<{ answer: ReviewAnswer; comment: ReviewComment }>
  ): void {
    if (!Array.isArray(value)) {
      throw new Error('Invalid value for ReviewAnswerBundle: must be an array');
    }
    value.forEach((item) => {
      if (!(item.answer instanceof ReviewAnswer)) {
        throw new Error(
          'Invalid value for ReviewAnswerBundle: answer must be a ReviewAnswer instance'
        );
      }
      if (!(item.comment instanceof ReviewComment)) {
        throw new Error(
          'Invalid value for ReviewAnswerBundle: comment must be a ReviewComment instance'
        );
      }
    });
  }

  public static create(
    value: Array<IReviewAnswer>
  ): ReviewAnswerBundle {
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
