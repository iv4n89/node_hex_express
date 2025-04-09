import IQuestionModel from '../application/QuestionModel';
import Question from '../domain/model/Question';

export default function toMongoModel(data: Question): IQuestionModel {
  return data.toPrimitives() as IQuestionModel;
}
