import { IReviewAnswer } from "../domain/models/ReviewAnswer";

export default interface IReview {
    id: string;
    userId: string;
    reviews: IReviewAnswer[];
    createdAt: Date;
    updatedAt?: Date;
}
