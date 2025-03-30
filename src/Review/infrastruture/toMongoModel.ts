import IReview from '../application/ReviewModel';
import Review from '../domain/models/Review';

export default function toMongoModel(review: Review): IReview {
  return review.toPrimitives();
}
