import LanguageId from '../../../Language/domain/valueObject/LanguageId';
import Question from '../../domain/model/Question';
import IQuestionRepository from '../../domain/repository/QuestionRepository';
import QuestionId from '../../domain/valueObject/QuestionId';
import { QuestionModel } from '../model/QuestionModel';
import toDomainModel from '../toDomainModel';
import toMongoModel from '../toMongoModel';

export default class QuestionRepository implements IQuestionRepository {
  constructor() {}

  async save(question: Question): Promise<boolean> {
    try {
      const model = toMongoModel(question);
      const newQuestion = await QuestionModel.create(model);
      const result = await newQuestion.save();
      return !!result;
    } catch (error) {
      console.error('Error saving question:', error);
      return false;
    }
  }

  async findById(id: QuestionId): Promise<Question | null> {
    try {
      const question = await QuestionModel.findOne({ id: id.getValue() });
      if (!question) {
        return null;
      }
      return toDomainModel(question);
    } catch (error) {
      console.error('Error finding question by ID:', error);
      return null;
    }
  }

  async findByLanguageId(languageId: LanguageId): Promise<Question[]> {
    try {
      const questions = await QuestionModel.find({
        languageId: languageId.getValue(),
      });
      if (!questions || questions.length === 0) {
        return [];
      }
      return questions.map((question) => toDomainModel(question));
    } catch (error) {
      console.error('Error finding questions by language ID:', error);
      return [];
    }
  }

  async findAll(): Promise<Question[]> {
    try {
      const questions = await QuestionModel.find();
      if (!questions || questions.length === 0) {
        return [];
      }
      return questions.map((question) => toDomainModel(question));
    } catch (error) {
      console.error('Error finding all questions:', error);
      return [];
    }
  }

  async delete(id: QuestionId): Promise<boolean> {
    try {
      const result = await QuestionModel.deleteOne({ id: id.getValue() });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting question:', error);
      return false;
    }
  }

  async update(question: Question): Promise<boolean> {
    try {
      const questionId = question.id;
      const savedQuestion = await QuestionModel.findOne({
        id: questionId.getValue(),
      });
      if (!savedQuestion) {
        throw new Error('Question not found');
      }
      const result = await QuestionModel.updateOne(
        { id: questionId.getValue() },
        toMongoModel(question)
      );
      return result.modifiedCount === 1;
    } catch (error) {
      console.error('Error updating question:', error);
      return false;
    }
  }
}
