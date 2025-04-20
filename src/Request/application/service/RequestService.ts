import { IRequest } from "../RequestModel";

export interface IRequestService {
    createRequest(
        languageId: string,
        questionsId: string,
        userId: string,
        description: string,
        gitUrl: string
    ): Promise<boolean>;

    getRequestById(id: string): Promise<IRequest | null>;

    getRequestsByLanguageId(languageId: string): Promise<IRequest[]>;

    getRequestsByUserId(userId: string): Promise<IRequest[]>;

    getRequestByUserIdAndLanguageId(
        userId: string,
        languageId: string
    ): Promise<IRequest[] | null>;

    getRequestsByQuestionsId(questionsId: string): Promise<IRequest[]>;

    getAllRequests(): Promise<IRequest[]>;

    deleteRequest(id: string): Promise<boolean>;

    updateRequest(
        id: string,
        languageId: string,
        questionsId: string,
        userId: string,
        description: string,
        gitUrl: string
    ): Promise<boolean>;
}
