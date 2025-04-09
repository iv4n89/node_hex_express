import UseCaseBase from "../../../Shared/application/UseCaseBase";
import IQuestionRepository from "../../domain/repository/QuestionRepository";
import QuestionId from "../../domain/valueObject/QuestionId";

export default class DeleteQuestionUseCase extends UseCaseBase<string, boolean> {
    constructor(private readonly questionRepository: IQuestionRepository) { super(); }

    override async execute(input: string): Promise<boolean> {
        try {
            const questionId = QuestionId.create(input);
            if (!questionId) {
                throw new Error("Invalid question ID");
            }
            const question = await this.questionRepository.findById(questionId);
            if (!question) {
                throw new Error("Question not found");
            }
            const result = await this.questionRepository.delete(questionId);
            if (!result) {
                throw new Error("Error deleting question");
            }
            return true;
        } catch (error) {
            console.error("Error deleting question:", error);
            throw new Error("Error deleting question");
        }
    }
}
