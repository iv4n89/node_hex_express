import UseCaseBase from "../../../Shared/application/UseCaseBase";
import Request from "../../domain/model/Request";
import { IRequestRepository } from "../../domain/repository/RequestRepository";
import RequestId from "../../domain/valueObject/RequestId";

export default class CreateRequestUseCase extends UseCaseBase<string, Request> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(input: string): Promise<Request> {
        const requestId = RequestId.create(input);
        const request = await this.requestRepository.findById(requestId);

        if (!request) {
            throw new Error("Request not found");
        }

        return request;
    }
}
