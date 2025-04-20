import LanguageId from "../../../Language/domain/valueObject/LanguageId";
import QuestionId from "../../../Question/domain/valueObject/QuestionId";
import UserId from "../../../Shared/domain/valueObject/UserId";
import RequestDescription from "../valueObject/RequestDescription";
import RequestGitUrl from "../valueObject/RequestGitUrl";
import RequestId from "../valueObject/RequestId";

export default class Request {
    id: RequestId;
    languageId: LanguageId;
    questionsId: QuestionId;
    userId: UserId;
    description: RequestDescription;
    gitUrl: RequestGitUrl;
    createdAt: Date;
    updatedAt?: Date;
    finishedAt?: Date;

    constructor(
        id: RequestId,
        languageId: LanguageId,
        questionsId: QuestionId,
        userId: UserId,
        description: RequestDescription,
        gitUrl: RequestGitUrl,
        createdAt: Date,
        updatedAt?: Date,
        finishedAt?: Date
    ) {
        this.id = id;
        this.languageId = languageId;
        this.questionsId = questionsId;
        this.userId = userId;
        this.description = description;
        this.gitUrl = gitUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.finishedAt = finishedAt;
    }

    public isFinished(): boolean {
        return this.finishedAt !== undefined;
    }

    public finishRequest(): void {
        this.finishedAt = new Date();
    }

    public static create(
        id: RequestId,
        languageId: LanguageId,
        questionsId: QuestionId,
        userId: UserId,
        description: RequestDescription,
        gitUrl: RequestGitUrl,
        createdAt: Date,
        updatedAt?: Date,
        finishedAt?: Date
    ): Request {
        return new Request(
            id,
            languageId,
            questionsId,
            userId,
            description,
            gitUrl,
            createdAt,
            updatedAt,
            finishedAt
        );
    }

    public static createWithoutId(
        languageId: LanguageId,
        questionsId: QuestionId,
        userId: UserId,
        description: RequestDescription,
        gitUrl: RequestGitUrl,
        createdAt: Date,
        updatedAt?: Date,
        finishedAt?: Date
    ): Request {
        return new Request(
            RequestId.generate(),
            languageId,
            questionsId,
            userId,
            description,
            gitUrl,
            createdAt,
            updatedAt,
            finishedAt
    )
};

    public static fromPrimitives(
        id: string,
        languageId: string,
        questionsId: string,
        userId: string,
        description: string,
        gitUrl: string,
        createdAt: Date,
        updatedAt?: Date,
        finishedAt?: Date
    ): Request {
        return new Request(
            RequestId.create(id),
            LanguageId.create(languageId),
            QuestionId.create(questionsId),
            UserId.create(userId),
            RequestDescription.create(description),
            RequestGitUrl.create(gitUrl),
            createdAt,
            updatedAt,
            finishedAt
        );
    }

    public toPrimitives(): {
        id: string;
        languageId: string;
        questionsId: string;
        userId: string;
        description: string;
        gitUrl: string;
        createdAt: Date;
        updatedAt?: Date;
        finishedAt?: Date;
    } {
        return {
            id: this.id.getValue(),
            languageId: this.languageId.getValue(),
            questionsId: this.questionsId.getValue(),
            userId: this.userId.getValue(),
            description: this.description.getValue(),
            gitUrl: this.gitUrl.getValue(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            finishedAt: this.finishedAt,
        };
    }
}
