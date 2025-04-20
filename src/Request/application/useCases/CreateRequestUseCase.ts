import LanguageId from "../../../Language/domain/valueObject/LanguageId";
import QuestionId from "../../../Question/domain/valueObject/QuestionId";
import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import Request from "../../domain/model/Request";
import { IRequestRepository } from "../../domain/repository/RequestRepository";
import RequestDescription from "../../domain/valueObject/RequestDescription";
import RequestGitUrl from "../../domain/valueObject/RequestGitUrl";

interface Input {
    languageId: string;
    questionsId: string;
    userId: string;
    description: string;
    gitUrl: string;
}

export default class CreateRequestUseCase extends UseCaseBase<Input, boolean> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(input: Input): Promise<boolean> {
        const languageId = LanguageId.create(input.languageId);
        const questionsId = QuestionId.create(input.questionsId);
        const userId = UserId.create(input.userId);
        const description = RequestDescription.create(input.description);
        const gitUrl = RequestGitUrl.create(input.gitUrl);

        const request = Request.createWithoutId(
            languageId,
            questionsId,
            userId,
            description,
            gitUrl,
            new Date()
        );

        const result = await this.requestRepository.save(request);

        if (result) {
            return true;
        } else {
            throw new Error("Error creating request");
        }

    }
}
