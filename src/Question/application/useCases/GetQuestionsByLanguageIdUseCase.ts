import LanguageId from '../../../Language/domain/valueObject/LanguageId';
import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Question from '../../domain/model/Question';
import IQuestionRepository from '../../domain/repository/QuestionRepository';

export default class GetQuestionsByLanguageIdUseCase extends UseCaseBase<
  string,
  Question[]
> {
  constructor(private readonly questionRepository: IQuestionRepository) {
    super();
  }

  override async execute(input: string): Promise<Question[]> {
    try {
      const languageId = LanguageId.create(input);
      if (!languageId) {
        throw new Error('Invalid language ID');
      }
      const questions =
        await this.questionRepository.findByLanguageId(languageId);
      if (!questions || questions.length === 0) {
        throw new Error('No questions found for the given language ID');
      }
      return questions;
    } catch (error) {
      console.error('Error fetching questions by language ID:', error);
      throw new Error('Error fetching questions by language ID');
    }
  }
}
