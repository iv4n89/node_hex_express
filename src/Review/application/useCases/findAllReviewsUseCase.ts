import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Review from '../../domain/models/Review';
import IReviewRepository from '../../domain/repository/ReviewRepository';

export default class FindAllReviewsUseCase extends UseCaseBase<void, Review[]> {
  constructor(private readonly reviewRepository: IReviewRepository) {
    super();
  }

  override async execute(): Promise<Review[]> {
    const foundReviews = await this.reviewRepository.findAll();
    if (!foundReviews) throw new Error('No reviews found');
    return foundReviews;
  }
}
