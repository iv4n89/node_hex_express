import { IReviewAnswer } from "../../domain/models/ReviewAnswer";

export default interface IReviewService {
    save(userId: string, reviews: IReviewAnswer[]): Promise<boolean>;
    findById(id: string): Promise<IReviewAnswer | null>;
    findByUserId(userId: string): Promise<IReviewAnswer | null>;
    findAll(): Promise<IReviewAnswer[] | null>;
    delete(id: string): Promise<boolean>;
    update(id: string, reviews: IReviewAnswer[]): Promise<boolean>;
}
