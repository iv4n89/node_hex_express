import IReview from '../application/ReviewModel';
import Review from '../domain/models/Review';

export default function toDomainModel(review: IReview): Review {
  return Review.createFromPrimitives(review);
}
