import { IReviewAnswer } from '../domain/models/ReviewAnswer';

export default interface IReview {
  id: string;
  userId: string;
  questionsId: string;
  answers: IReviewAnswer[];
  createdAt: Date;
  updatedAt?: Date;
}
