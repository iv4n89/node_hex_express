import QuestionRepository from '../../../Question/infrastructure/repository/QuestionRepository';
import UserRepository from '../../../User/infrastruture/repository/UserRepository';
import IReview from '../../application/ReviewModel';
import IReviewService from '../../application/service/IReviewService';
import DeleteReviewUseCase from '../../application/useCases/deleteReviewUseCase';
import FindAllReviewsUseCase from '../../application/useCases/findAllReviewsUseCase';
import FindByQuestionsIdAndUserIdUseCase from '../../application/useCases/FindByQuestionsIdAndUserIdUseCase';
import FindByQuestionsIdUseCase from '../../application/useCases/FindByQuestionsIdUseCase';
import FindByUserIdAndFinishedUseCase from '../../application/useCases/FindByUserIdAndFinishedUseCase';
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
  private readonly findByUserIdAndFinishedReviewUseCase: FindByUserIdAndFinishedUseCase;
  private readonly findByQuestionsIdReviewUseCase: FindByQuestionsIdUseCase;
  private readonly findNoAnswerByUserIdReviewUseCase: FindNoAnswerByUserIdUseCase;
  private readonly findByQuestionsIdAndUserIdReviewUseCase: FindByQuestionsIdAndUserIdUseCase;
  private readonly countByUserIdReviewUseCase: FindReviewsByUserIdUseCase;
  private readonly findAllReviewUseCase: FindAllReviewsUseCase;
  private readonly updateReviewUseCase: UpdateReviewUseCase;
  private readonly deleteReviewUseCase: DeleteReviewUseCase;

  constructor() {
    const reviewRepository = new ReviewRepository();
    const questionRepository = new QuestionRepository();
    const userRepository = new UserRepository();

    this.saveReviewUseCase = new SaveReviewUseCase(reviewRepository);
    this.findByIdReviewUseCase = new FindReviewByIdUseCase(reviewRepository);
    this.findByUserIdAndFinishedReviewUseCase =
      new FindByUserIdAndFinishedUseCase(reviewRepository);
    this.findByUserIdReviewUseCase = new FindReviewsByUserIdUseCase(
      reviewRepository
    );
    this.findNoAnswerByUserIdReviewUseCase = new FindNoAnswerByUserIdUseCase(
      reviewRepository
    );
    this.findByQuestionsIdReviewUseCase = new FindByQuestionsIdUseCase(
      reviewRepository,
      questionRepository
    );
    this.findByQuestionsIdAndUserIdReviewUseCase =
      new FindByQuestionsIdAndUserIdUseCase(reviewRepository, userRepository);
    this.countByUserIdReviewUseCase = new FindReviewsByUserIdUseCase(
      reviewRepository
    );
    this.findAllReviewUseCase = new FindAllReviewsUseCase(reviewRepository);
    this.updateReviewUseCase = new UpdateReviewUseCase(reviewRepository);
    this.deleteReviewUseCase = new DeleteReviewUseCase(reviewRepository);
  }

  async save(
    userId: string,
    questionsId: string,
    answers: IReviewAnswer[]
  ): Promise<boolean> {
    return await this.saveReviewUseCase.execute({
      userId: userId,
      questionsId,
      answers,
    });
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

  async findByUserIdAndFinished(userId: string): Promise<IReview[] | null> {
    const reviews =
      await this.findByUserIdAndFinishedReviewUseCase.execute(userId);
    if (!reviews) return null;
    return reviews.map((review) => toMongoModel(review));
  }

  async findByUserId(userId: string): Promise<IReview[] | null> {
    const reviews = await this.findByUserIdReviewUseCase.execute(userId);
    if (!reviews) return null;
    return reviews.map((review) => toMongoModel(review));
  }

  async findByQuestionsId(questionsId: string): Promise<IReview[] | null> {
    const reviews =
      await this.findByQuestionsIdReviewUseCase.execute(questionsId);
    if (!reviews) return null;
    return reviews.map((review) => toMongoModel(review));
  }

  async findByQuestionsIdAndUserId(questionsId: string, userId: string): Promise<IReview[] | null> {
    const review =
      await this.findByQuestionsIdAndUserIdReviewUseCase.execute({questionsId, userId});
    if (!review) return null;
    return review.map((review) => toMongoModel(review));
  }

  async findNoAnswerByUserId(userId: string): Promise<IReview[] | null> {
    const reviews =
      await this.findNoAnswerByUserIdReviewUseCase.execute(userId);
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
