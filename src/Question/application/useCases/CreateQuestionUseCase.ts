import LanguageId from "../../../Language/domain/valueObject/LanguageId";
import UseCaseBase from "../../../Shared/application/UseCaseBase";
import Question from "../../domain/model/Question";
import IQuestionRepository from "../../domain/repository/QuestionRepository";
import QuestionDescription from "../../domain/valueObject/QuestionDescription";

interface Input {
    languageId: string;
    descriptions: string[];
}

export default class CreateQuestionUseCase extends UseCaseBase<Input, boolean> {
    constructor(private readonly questionRepository: IQuestionRepository) { super(); }

    override async execute(input: Input): Promise<boolean> {
        try {
            const { languageId, descriptions } = input;
            const question = Question.createWithoutId(LanguageId.create(languageId), descriptions.map(desc => QuestionDescription.create(desc)));
            const result = this.questionRepository.save(question);
            if (!result) {
                throw new Error("Error creating question");
            }
            return true;
        } catch (error) {
            console.error("Error creating question:", error);
            return false;
        }
    }
}
