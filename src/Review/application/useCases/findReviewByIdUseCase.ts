import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Review from '../../domain/models/Review';
import IReviewRepository from '../../domain/repository/ReviewRepository';
import ReviewId from '../../domain/valueObject/ReviewId';

export default class FindReviewByIdUseCase extends UseCaseBase<string, Review> {
  constructor(private readonly reviewRepository: IReviewRepository) {
    super();
  }

  override async execute(input: string): Promise<Review> {
    const reviewId = ReviewId.create(input);
    const foundReview = await this.reviewRepository.findById(reviewId);
    if (!foundReview) throw new Error('Review not found');
    return foundReview;
  }
}
