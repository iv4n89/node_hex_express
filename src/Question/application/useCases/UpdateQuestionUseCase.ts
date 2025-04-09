import LanguageId from '../../../Language/domain/valueObject/LanguageId';
import UseCaseBase from '../../../Shared/application/UseCaseBase';
import Question from '../../domain/model/Question';
import IQuestionRepository from '../../domain/repository/QuestionRepository';
import QuestionDescription from '../../domain/valueObject/QuestionDescription';
import QuestionId from '../../domain/valueObject/QuestionId';

interface Input {
  questionId: string;
  languageId?: string;
  descriptions: string[];
}

export default class UpdateQuestionUseCase extends UseCaseBase<Input, boolean> {
  constructor(private readonly questionRepository: IQuestionRepository) {
    super();
  }

  override async execute(input: Input): Promise<boolean> {
    try {
      const questionId = QuestionId.create(input.questionId);
      const newQuestions = input.descriptions.map((desc) =>
        QuestionDescription.create(desc)
      );
      const question = await this.questionRepository.findById(questionId);
      if (!question) {
        throw new Error('Question not found');
      }

      const languageId = input.languageId
        ? LanguageId.create(input.languageId)
        : question.languageId;
      const updatedQuestion = Question.fromPrimitives({
        id: questionId.getValue(),
        languageId: languageId.getValue(),
        descriptions: newQuestions.map((desc) => desc.getValue()),
      });
      const result = await this.questionRepository.update(updatedQuestion);
      if (!result) {
        throw new Error('Error updating question');
      }
      return true;
    } catch (error) {
      console.error('Error updating question:', error);
      return false;
    }
  }
}
