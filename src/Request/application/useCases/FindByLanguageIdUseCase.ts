import LanguageId from "../../../Language/domain/valueObject/LanguageId";
import UseCaseBase from "../../../Shared/application/UseCaseBase";
import Request from "../../domain/model/Request";
import { IRequestRepository } from "../../domain/repository/RequestRepository";

export default class FindByLanguageIdUseCase extends UseCaseBase<string, Array<Request>> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(input: string): Promise<Request[]> {
        const languageId = LanguageId.create(input);
        const requests = await this.requestRepository.findByLanguageId(languageId);
        if (!requests) {
            throw new Error("Request not found");
        }
        return requests;
    }
}
