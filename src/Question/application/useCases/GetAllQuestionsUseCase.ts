import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Question from '../../domain/model/Question';
import IQuestionRepository from '../../domain/repository/QuestionRepository';

export default class GetAllQuestionsUseCase extends UseCaseBase<
  void,
  Question[]
> {
  constructor(private readonly questionRepository: IQuestionRepository) {
    super();
  }

  override async execute(): Promise<Question[]> {
    try {
      const questions = await this.questionRepository.findAll();
      if (!questions) {
        throw new Error('No questions found');
      }
      return questions;
    } catch (error) {
      console.error('Error fetching all questions:', error);
      throw new Error('Error fetching all questions');
    }
  }
}
