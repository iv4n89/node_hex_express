import LanguageId from "../../../Language/domain/valueObject/LanguageId";
import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import Request from "../../domain/model/Request";
import { IRequestRepository } from "../../domain/repository/RequestRepository";

interface Input {
    userId: string;
    languageId: string;
}

export default class FindByUserIdAndLanguageIdUseCase extends UseCaseBase<Input, Array<Request>> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(input: Input): Promise<Request[]> {
        const userId = UserId.create(input.userId);
        const languageId = LanguageId.create(input.languageId);

        const requests = await this.requestRepository.findByUserIdAndLanguageId(userId, languageId);
        if (!requests) {
            throw new Error("Request not found");
        }
        return requests;
    }
}
