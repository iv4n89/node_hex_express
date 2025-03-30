import UseCaseBase from '../../../Shared/application/UseCaseBase';
import UserId from '../../../Shared/domain/valueObject/UserId';
import Review from '../../domain/models/Review';
import { IReviewAnswer } from '../../domain/models/ReviewAnswer';
import IReviewRepository from '../../domain/repository/ReviewRepository';
import ReviewAnswerBundle from '../../domain/valueObject/ReviewAnswerBundle';

interface Props {
  userId: string;
  answers: Array<IReviewAnswer>;
}

export default class SaveReviewUseCase extends UseCaseBase<Props, boolean> {
  constructor(private readonly reviewRepository: IReviewRepository) {
    super();
  }

  override async execute(input: Props): Promise<boolean> {
    const userId = UserId.create(input.userId);
    const reviews = ReviewAnswerBundle.create(input.answers);
    const review = Review.createWithoutId(userId, reviews);
    const saved = await this.reviewRepository.save(review);
    if (!saved) throw new Error('Error saving review');
    return saved;
  }
}
