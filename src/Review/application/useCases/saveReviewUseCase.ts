import UseCaseBase from '../../../Shared/application/UseCaseBase';
import UserId from '../../../Shared/domain/valueObject/UserId';
import Review from '../../domain/models/Review';
import IReviewRepository from '../../domain/repository/ReviewRepository';
import ReviewAnswerBundle from '../../domain/valueObject/ReviewAnswerBundle';
import IReview from '../ReviewModel';

export default class SaveReviewUseCase extends UseCaseBase<IReview, Review> {
  constructor(private readonly reviewRepository: IReviewRepository) {
    super();
  }

  override async execute(input: IReview): Promise<Review> {
    const userId = UserId.create(input.userId);
    const reviews = ReviewAnswerBundle.create(input.reviews);
    const review = Review.createWithoutId(userId, reviews);
    const saved = await this.reviewRepository.save(review);
    if (!saved) throw new Error('Error saving review');
    return review;
  }
}
