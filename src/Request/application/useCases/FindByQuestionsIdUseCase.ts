import QuestionId from "../../../Question/domain/valueObject/QuestionId";
import UseCaseBase from "../../../Shared/application/UseCaseBase";
import Request from "../../domain/model/Request";
import { IRequestRepository } from "../../domain/repository/RequestRepository";

export default class FindByQuestionsIdUseCase extends UseCaseBase<string, Array<Request>> {
    constructor(private readonly requestRepository: IRequestRepository) {
        super();
    }

    override async execute(input: string): Promise<Request[]> {
        const questionsId = QuestionId.create(input);
        const requests = await this.requestRepository.findByQuestionsId(questionsId);
        if (!requests) {
            throw new Error("Request not found");
        }
        return requests;
    }
}
