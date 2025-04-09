import QuestionId from '../../../Question/domain/valueObject/QuestionId';
import UserId from '../../../Shared/domain/valueObject/UserId';
import Review from '../models/Review';
import ReviewId from '../valueObject/ReviewId';

export default interface IReviewRepository {
  save(review: Review): Promise<boolean>;
  findById(id: ReviewId): Promise<Review | null>;
  findByUserId(userId: UserId): Promise<Array<Review> | null>;
  findNoAnswerByUserId(userId: UserId): Promise<Array<Review> | null>;
  findByQuestionsId(questionsId: QuestionId): Promise<Array<Review> | null>;
  findByQuestionsIdAndUserId(
    questionsId: QuestionId,
    userId: UserId
  ) : Promise<Review[] | null>;
  findAll(): Promise<Array<Review> | null>;
  countByUserId(userId: UserId): Promise<number>;
  delete(id: ReviewId): Promise<boolean>;
  update(review: Review): Promise<boolean>;
}
