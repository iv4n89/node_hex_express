import IQuestionModel from '../QuestionModel';

export default interface IQuestionService {
  createQuestion(languageId: string, descriptions: string[]): Promise<boolean>;
  findAllQuestions(): Promise<IQuestionModel[]>;
  findQuestionById(id: string): Promise<IQuestionModel | null>;
  findQuestionsByLanguageId(languageId: string): Promise<IQuestionModel[]>;
  updateQuestion(
    id: string,
    languageId: string,
    descriptions: string[]
  ): Promise<boolean>;
  deleteQuestion(id: string): Promise<boolean>;
}
