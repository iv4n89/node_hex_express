import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Question from '../../domain/model/Question';
import IQuestionRepository from '../../domain/repository/QuestionRepository';
import QuestionId from '../../domain/valueObject/QuestionId';

export default class GetQuestionByIdUseCase extends UseCaseBase<
  string,
  Question
> {
  constructor(private readonly questionRepository: IQuestionRepository) {
    super();
  }

  override async execute(input: string): Promise<Question> {
    try {
      const questionId = QuestionId.create(input);
      if (!questionId) {
        throw new Error('Invalid question ID');
      }
      const question = await this.questionRepository.findById(questionId);
      if (!question) {
        throw new Error('Question not found');
      }
      return question;
    } catch (error) {
      console.error('Error fetching question by ID:', error);
      throw new Error('Error fetching question by ID');
    }
  }
}
