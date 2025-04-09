import QuestionId from '../../../Question/domain/valueObject/QuestionId';
import UserId from '../../../Shared/domain/valueObject/UserId';
import ReviewAnswerBundle from '../valueObject/ReviewAnswerBundle';
import ReviewId from '../valueObject/ReviewId';
import { IReviewAnswer } from './ReviewAnswer';

export default class Review {
  id: ReviewId;
  userId: UserId;
  questionsId: QuestionId;
  answers: ReviewAnswerBundle;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    id: ReviewId,
    userId: UserId,
    questionsId: QuestionId,
    answers: ReviewAnswerBundle
  ) {
    this.id = id;
    this.userId = userId;
    this.questionsId = questionsId;
    this.answers = answers;
    this.createdAt = new Date();
  }

  public static create(
    id: ReviewId,
    userId: UserId,
    questionsId: QuestionId,
    answers: ReviewAnswerBundle
  ): Review {
    return new Review(id, userId, questionsId, answers);
  }

  public updateReviews(answers: ReviewAnswerBundle): void {
    this.answers = answers;
    this.updatedAt = new Date();
  }

  public static createWithoutId(
    userId: UserId,
    questionsId: QuestionId,
    reviews: ReviewAnswerBundle
  ): Review {
    return new Review(ReviewId.generate(), userId, questionsId, reviews);
  }

  public static createFromPrimitives({
    id,
    userId,
    questionsId,
    answers,
  }: {
    id?: string;
    userId: string;
    questionsId: string;
    answers: Array<IReviewAnswer>;
  }): Review {
    answers ||= [];
    return new Review(
      id ? ReviewId.create(id) : ReviewId.generate(),
      UserId.create(userId),
      QuestionId.create(questionsId),
      ReviewAnswerBundle.create(answers)
    );
  }

  public toPrimitives(): {
    id: string;
    userId: string;
    questionsId: string;
    answers: Array<IReviewAnswer>;
    createdAt: Date;
    updatedAt?: Date;
  } {
    return {
      id: this.id.getValue(),
      userId: this.userId.getValue(),
      questionsId: this.questionsId.getValue(),
      answers: this.answers.getAnswers(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
