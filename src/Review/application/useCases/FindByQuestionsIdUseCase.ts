import IQuestionRepository from '../../../Question/domain/repository/QuestionRepository';
import QuestionId from '../../../Question/domain/valueObject/QuestionId';
import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Review from '../../domain/models/Review';
import IReviewRepository from '../../domain/repository/ReviewRepository';

export default class FindByQuestionsIdUseCase extends UseCaseBase<
  string,
  Array<Review>
> {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly questionsRepository: IQuestionRepository
  ) {
    super();
  }

  override async execute(input: string): Promise<Review[]> {
    try {
      const questionId = QuestionId.create(input);
      const question = await this.questionsRepository.findById(questionId);
      if (!question) {
        throw new Error('Question not found');
      }
      const reviews = await this.reviewRepository.findByQuestionsId(questionId);
      if (!reviews) {
        return [];
      }
      return reviews;
    } catch (error) {
      throw new Error(`Error finding reviews by question ID: ${error}`);
    }
  }
}
