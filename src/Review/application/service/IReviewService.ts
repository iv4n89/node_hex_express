import { IReviewAnswer } from '../../domain/models/ReviewAnswer';
import IReview from '../ReviewModel';

export default interface IReviewService {
  save(userId: string, answers: IReviewAnswer[]): Promise<boolean>;
  findById(id: string): Promise<IReview | null>;
  findByUserId(userId: string): Promise<IReview[] | null>;
  findAll(): Promise<IReview[] | null>;
  delete(id: string): Promise<boolean>;
  update(id: string, answers: IReviewAnswer[]): Promise<boolean>;
}
