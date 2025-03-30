import UseCaseBase from '../../../Shared/application/UseCaseBase';
import IReviewRepository from '../../domain/repository/ReviewRepository';
import ReviewId from '../../domain/valueObject/ReviewId';

export default class DeleteReviewUseCase extends UseCaseBase<string, boolean> {
  constructor(private readonly reviewRepository: IReviewRepository) {
    super();
  }

  override async execute(input: string): Promise<boolean> {
    const reviewId = ReviewId.create(input);
    const deleted = await this.reviewRepository.delete(reviewId);
    if (!deleted) throw new Error('Error deleting review');
    return deleted;
  }
}
