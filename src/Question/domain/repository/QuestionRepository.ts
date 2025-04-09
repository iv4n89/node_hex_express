import LanguageId from '../../../Language/domain/valueObject/LanguageId';
import Question from '../model/Question';
import QuestionId from '../valueObject/QuestionId';

export default interface IQuestionRepository {
  save(question: Question): Promise<boolean>;
  findById(id: QuestionId): Promise<Question | null>;
  findByLanguageId(languageId: LanguageId): Promise<Question[]>;
  findAll(): Promise<Question[]>;
  delete(id: QuestionId): Promise<boolean>;
  update(question: Question): Promise<boolean>;
}
