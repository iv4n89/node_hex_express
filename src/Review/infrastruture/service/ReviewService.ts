import IReview from '../../application/ReviewModel';
import IReviewService from '../../application/service/IReviewService';
import DeleteReviewUseCase from '../../application/useCases/deleteReviewUseCase';
import FindAllReviewsUseCase from '../../application/useCases/findAllReviewsUseCase';
import FindNoAnswerByUserIdUseCase from '../../application/useCases/FindNoAnswerByUserIdUseCase';
import FindReviewByIdUseCase from '../../application/useCases/findReviewByIdUseCase';
import FindReviewsByUserIdUseCase from '../../application/useCases/findReviewsByUserIdUseCase';
import SaveReviewUseCase from '../../application/useCases/saveReviewUseCase';
import UpdateReviewUseCase from '../../application/useCases/updateReviewUseCase';
import { IReviewAnswer } from '../../domain/models/ReviewAnswer';
import ReviewRepository from '../repository/ReviewRepository';
import toMongoModel from '../toMongoModel';

export default class ReviewService implements IReviewService {
  private readonly saveReviewUseCase: SaveReviewUseCase;
  private readonly findByIdReviewUseCase: FindReviewByIdUseCase;
  private readonly findByUserIdReviewUseCase: FindReviewsByUserIdUseCase;
  private readonly findNoAnswerByUserIdReviewUseCase: FindNoAnswerByUserIdUseCase;
  private readonly countByUserIdReviewUseCase: FindReviewsByUserIdUseCase;
  private readonly findAllReviewUseCase: FindAllReviewsUseCase;
  private readonly updateReviewUseCase: UpdateReviewUseCase;
  private readonly deleteReviewUseCase: DeleteReviewUseCase;

  constructor() {
    const reviewRepository = new ReviewRepository();
    this.saveReviewUseCase = new SaveReviewUseCase(reviewRepository);
    this.findByIdReviewUseCase = new FindReviewByIdUseCase(reviewRepository);
    this.findByUserIdReviewUseCase = new FindReviewsByUserIdUseCase(
      reviewRepository
    );
    this.findNoAnswerByUserIdReviewUseCase = new FindNoAnswerByUserIdUseCase(
      reviewRepository
    );
    this.countByUserIdReviewUseCase = new FindReviewsByUserIdUseCase(
      reviewRepository
    );
    this.findAllReviewUseCase = new FindAllReviewsUseCase(reviewRepository);
    this.updateReviewUseCase = new UpdateReviewUseCase(reviewRepository);
    this.deleteReviewUseCase = new DeleteReviewUseCase(reviewRepository);
  }

  async save(userId: string, answers: IReviewAnswer[]): Promise<boolean> {
    return await this.saveReviewUseCase.execute({ userId: userId, answers });
  }

  async findAll(): Promise<IReview[] | null> {
    const reviews = await this.findAllReviewUseCase.execute();
    if (!reviews) return null;
    return reviews.map((review) => toMongoModel(review));
  }

  async findById(id: string): Promise<IReview | null> {
    const review = await this.findByIdReviewUseCase.execute(id);
    if (!review) return null;
    return toMongoModel(review);
  }

  async findByUserId(userId: string): Promise<IReview[] | null> {
    const reviews = await this.findByUserIdReviewUseCase.execute(userId);
    if (!reviews) return null;
    return reviews.map((review) => toMongoModel(review));
  }

  async findNoAnswerByUserId(userId: string): Promise<IReview[] | null> {
    const reviews = await this.findNoAnswerByUserIdReviewUseCase.execute(userId);
    if (!reviews) return null;
    return reviews.map((review) => toMongoModel(review));
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await this.countByUserIdReviewUseCase.execute(userId);
    if (!count) return 0;
    return count.length;
  }

  async delete(id: string): Promise<boolean> {
    return await this.deleteReviewUseCase.execute(id);
  }

  async update(id: string, answers: IReviewAnswer[]): Promise<boolean> {
    return await this.updateReviewUseCase.execute({ id, answers });
  }
}
