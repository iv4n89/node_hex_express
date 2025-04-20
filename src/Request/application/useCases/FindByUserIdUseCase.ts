import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import Request from "../../domain/model/Request";
import { IRequestRepository } from "../../domain/repository/RequestRepository";

export default class FindByUserIdUseCase extends UseCaseBase<string, Array<Request>> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(input: string): Promise<Request[]> {
        const userId = UserId.create(input);
        const requests = await this.requestRepository.findByUserId(userId);
        if (!requests) {
            throw new Error("Request not found");
        }
        return requests;
    }
}
