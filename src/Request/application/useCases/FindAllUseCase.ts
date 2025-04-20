import UseCaseBase from "../../../Shared/application/UseCaseBase";
import Request from "../../domain/model/Request";
import { IRequestRepository } from "../../domain/repository/RequestRepository";

export default class FindAllUseCase extends UseCaseBase<void, Array<Request>> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(): Promise<Request[]> {
        const requests = await this.requestRepository.findAll();
        if (!requests) {
            throw new Error("Request not found");
        }
        return requests;
    }
}
