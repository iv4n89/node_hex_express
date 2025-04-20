import LanguageId from "../../../Language/domain/valueObject/LanguageId";
import QuestionId from "../../../Question/domain/valueObject/QuestionId";
import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import { IRequestRepository } from "../../domain/repository/RequestRepository";
import RequestDescription from "../../domain/valueObject/RequestDescription";
import RequestGitUrl from "../../domain/valueObject/RequestGitUrl";
import RequestId from "../../domain/valueObject/RequestId";

interface Input {
    id: string;
    languageId?: string;
    questionsId?: string;
    userId?: string;
    description?: string;
    gitUrl?: string;
    finish?: boolean;
}

export default class UpdateUseCase extends UseCaseBase<Input, boolean> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(input: Input): Promise<boolean> {
        const request = await this.requestRepository.findById(RequestId.create(input.id));
        if (!request) {
            throw new Error("Request not found");
        }

        if (input.languageId) {
            request.languageId = LanguageId.create(input.languageId);
        }

        if (input.questionsId) {
            request.questionsId = QuestionId.create(input.questionsId);
        }

        if (input.userId) {
            request.userId = UserId.create(input.userId);
        }

        if (input.description) {
            request.description = RequestDescription.create(input.description);
        }

        if (input.gitUrl) {
            request.gitUrl = RequestGitUrl.create(input.gitUrl);
        }

        if (input?.finish && input?.finish === true) {
            request.finishRequest();
        }

        const result = await this.requestRepository.update(request);
        if (result) {
            return true;
        }
        else {
            throw new Error("Error updating request");
        }
    }
}
