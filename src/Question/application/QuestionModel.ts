
export default interface IQuestionModel {
    id: string;
    languageId: string;
    descriptions: string[];
    createdAt: Date;
    updatedAt?: Date;
}
