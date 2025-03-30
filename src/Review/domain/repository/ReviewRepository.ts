import UserId from '../../../Shared/domain/valueObject/UserId';
import Review from '../models/Review';
import ReviewId from '../valueObject/ReviewId';

export default interface IReviewRepository {
  save(review: Review): Promise<boolean>;
  findById(id: ReviewId): Promise<Review | null>;
  findByUserId(userId: UserId): Promise<Array<Review> | null>;
  findAll(): Promise<Array<Review> | null>;
  delete(id: ReviewId): Promise<boolean>;
  update(review: Review): Promise<boolean>;
}
