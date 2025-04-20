import LanguageId from "../../../Language/domain/valueObject/LanguageId";
import QuestionId from "../../../Question/domain/valueObject/QuestionId";
import UserId from "../../../Shared/domain/valueObject/UserId";
import Request from "../model/Request";
import RequestId from "../valueObject/RequestId";

export interface IRequestRepository {
    save(request: Request): Promise<boolean>;
    findById(id: RequestId): Promise<Request | null>;
    findByLanguageId(languageId: LanguageId): Promise<Request[]>;
    findByUserId(userId: UserId): Promise<Request[]>;
    findByUserIdAndLanguageId(
        userId: UserId,
        languageId: LanguageId
    ): Promise<Request[] | null>;
    findByQuestionsId(questionsId: QuestionId): Promise<Request[]>;
    findAll(): Promise<Request[]>;
    delete(id: RequestId): Promise<boolean>;
    update(request: Request): Promise<boolean>;
}
