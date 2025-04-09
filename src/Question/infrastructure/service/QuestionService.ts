import IQuestionModel from '../../application/QuestionModel';
import IQuestionService from '../../application/service/QuestionService';
import CreateQuestionUseCase from '../../application/useCases/CreateQuestionUseCase';
import DeleteQuestionUseCase from '../../application/useCases/DeleteQuestionUseCase';
import GetAllQuestionsUseCase from '../../application/useCases/GetAllQuestionsUseCase';
import GetQuestionByIdUseCase from '../../application/useCases/GetQuestionByIdUseCase';
import GetQuestionsByLanguageIdUseCase from '../../application/useCases/GetQuestionsByLanguageIdUseCase';
import UpdateQuestionUseCase from '../../application/useCases/UpdateQuestionUseCase';
import QuestionRepository from '../repository/QuestionRepository';

export default class QuestionService implements IQuestionService {
  private readonly createQuestionUseCase: CreateQuestionUseCase;
  private readonly getQuestionByIdUseCase: GetQuestionByIdUseCase;
  private readonly getQuestionByLanguageIdUseCase: GetQuestionsByLanguageIdUseCase;
  private readonly getAllQuestionsUseCase: GetAllQuestionsUseCase;
  private readonly deleteQuestionUseCase: DeleteQuestionUseCase;
  private readonly updateQuestionUseCase: UpdateQuestionUseCase;

  constructor() {
    const questionRepository = new QuestionRepository();
    this.createQuestionUseCase = new CreateQuestionUseCase(questionRepository);
    this.getQuestionByIdUseCase = new GetQuestionByIdUseCase(
      questionRepository
    );
    this.getQuestionByLanguageIdUseCase = new GetQuestionsByLanguageIdUseCase(
      questionRepository
    );
    this.getAllQuestionsUseCase = new GetAllQuestionsUseCase(
      questionRepository
    );
    this.deleteQuestionUseCase = new DeleteQuestionUseCase(questionRepository);
    this.updateQuestionUseCase = new UpdateQuestionUseCase(questionRepository);
  }

  async createQuestion(
    languageId: string,
    descriptions: string[]
  ): Promise<boolean> {
    try {
      return await this.createQuestionUseCase.execute({
        languageId,
        descriptions,
      });
    } catch (error) {
      console.error('Error creating question:', error);
      return false;
    }
  }

  async findQuestionById(id: string): Promise<IQuestionModel | null> {
    try {
      const question = await this.getQuestionByIdUseCase.execute(id);
      return question ? question.toPrimitives() : null;
    } catch (error) {
      console.error('Error fetching question by ID:', error);
      return null;
    }
  }

  async findQuestionsByLanguageId(
    languageId: string
  ): Promise<IQuestionModel[]> {
    try {
      const questions =
        await this.getQuestionByLanguageIdUseCase.execute(languageId);
      return questions.map((question) => question.toPrimitives());
    } catch (error) {
      console.error('Error fetching questions by language ID:', error);
      return [];
    }
  }

  async findAllQuestions(): Promise<IQuestionModel[]> {
    try {
      const questions = await this.getAllQuestionsUseCase.execute();
      return questions.map((question) => question.toPrimitives());
    } catch (error) {
      console.error('Error fetching all questions:', error);
      return [];
    }
  }

  async deleteQuestion(id: string): Promise<boolean> {
    try {
      return await this.deleteQuestionUseCase.execute(id);
    } catch (error) {
      console.error('Error deleting question:', error);
      return false;
    }
  }

  async updateQuestion(
    id: string,
    languageId: string,
    descriptions: string[]
  ): Promise<boolean> {
    try {
      return await this.updateQuestionUseCase.execute({
        questionId: id,
        languageId,
        descriptions,
      });
    } catch (error) {
      console.error('Error updating question:', error);
      return false;
    }
  }
}
