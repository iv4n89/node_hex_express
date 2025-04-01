import UserId from '../../../Shared/domain/valueObject/UserId';
import ReviewAnswerBundle from '../valueObject/ReviewAnswerBundle';
import ReviewId from '../valueObject/ReviewId';
import { IReviewAnswer } from './ReviewAnswer';

export default class Review {
  id: ReviewId;
  userId: UserId;
  answers: ReviewAnswerBundle;
  createdAt: Date;
  updatedAt?: Date;

  constructor(id: ReviewId, userId: UserId, answers: ReviewAnswerBundle) {
    this.id = id;
    this.userId = userId;
    this.answers = answers;
    this.createdAt = new Date();
  }

  public static create(
    id: ReviewId,
    userId: UserId,
    answers: ReviewAnswerBundle
  ): Review {
    return new Review(id, userId, answers);
  }

  public updateReviews(answers: ReviewAnswerBundle): void {
    this.answers = answers;
    this.updatedAt = new Date();
  }

  public static createWithoutId(
    userId: UserId,
    reviews: ReviewAnswerBundle
  ): Review {
    return new Review(ReviewId.generate(), userId, reviews);
  }

  public static createFromPrimitives({
    id,
    userId,
    answers,
  }: {
    id?: string;
    userId: string;
    answers: Array<IReviewAnswer>;
  }): Review {
    answers ||= [];
    return new Review(
      id ? ReviewId.create(id) : ReviewId.generate(),
      UserId.create(userId),
      ReviewAnswerBundle.create(answers)
    );
  }

  public toPrimitives(): {
    id: string;
    userId: string;
    answers: Array<IReviewAnswer>;
    createdAt: Date;
    updatedAt?: Date;
  } {
    return {
      id: this.id.getValue(),
      userId: this.userId.getValue(),
      answers: this.answers.getAnswers(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
