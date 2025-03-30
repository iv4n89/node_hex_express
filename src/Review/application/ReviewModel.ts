import { IReviewAnswer } from '../domain/models/ReviewAnswer';

export default interface IReview {
  id: string;
  userId: string;
  answers: IReviewAnswer[];
  createdAt: Date;
  updatedAt?: Date;
}
