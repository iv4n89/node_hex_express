import IQuestionModel from "../application/QuestionModel";
import Question from "../domain/model/Question";

export default function toDomainModel(data: IQuestionModel): Question {
    return Question.fromPrimitives({
        id: data.id,
        languageId: data.languageId,
        descriptions: data.descriptions,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    })
}
