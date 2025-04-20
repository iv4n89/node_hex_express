
export interface IRequest {
    id: string;
    languageId: string;
    questionsId: string;
    userId: string;
    description: string;
    gitUrl: string;
    createdAt: Date;
    updatedAt?: Date;
    finishedAt?: Date;
}
