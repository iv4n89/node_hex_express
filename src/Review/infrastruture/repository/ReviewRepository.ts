import QuestionId from '../../../Question/domain/valueObject/QuestionId';
import UserId from '../../../Shared/domain/valueObject/UserId';
import Review from '../../domain/models/Review';
import IReviewRepository from '../../domain/repository/ReviewRepository';
import ReviewId from '../../domain/valueObject/ReviewId';
import { ReviewModel } from '../models/ReviewModel';
import toDomainModel from '../toDomainModel';
import toMongoModel from '../toMongoModel';

export default class ReviewRepository implements IReviewRepository {
  constructor() {}

  async save(review: Review): Promise<boolean> {
    const reviewMongo = toMongoModel(review);
    const reviewModel = ReviewModel.create(reviewMongo);
    const result = await (await reviewModel).save();
    return !!result;
  }

  async findById(id: ReviewId): Promise<Review | null> {
    const reviewId = id.getValue();
    const reviewModel = await ReviewModel.findOne({ id: reviewId });
    if (!reviewModel) {
      return null;
    }
    return toDomainModel(reviewModel);
  }

  async findByUserId(userId: UserId): Promise<Array<Review> | null> {
    const userIdValue = userId.getValue();
    const result = await ReviewModel.find({ userId: userIdValue });
    if (!result) {
      return null;
    }
    return result.map((review) => toDomainModel(review));
  }

  async countByUserId(userId: UserId): Promise<number> {
    const result = await ReviewModel.countDocuments({
      userId: userId.getValue(),
    });
    if (!result) {
      return 0;
    }
    return result;
  }

  async findNoAnswerByUserId(userId: UserId): Promise<Array<Review> | null> {
    const userIdValue = userId.getValue();
    const result = await ReviewModel.find({
      userId: userIdValue,
      answers: { $len: 0 },
    });
    if (!result) {
      return null;
    }
    return result.map((review) => toDomainModel(review));
  }

  async findByQuestionsId(
    questionsId: QuestionId
  ): Promise<Array<Review> | null> {
    try {
      const result = await ReviewModel.find({
        questionsId: questionsId.getValue(),
      });
      if (!result) {
        return null;
      }
      return result.map((review) => toDomainModel(review));
    } catch (error) {
      console.error('Error finding reviews by question ID:', error);
      return null;
    }
  }

  async findByQuestionsIdAndUserId(questionsId: QuestionId, userId: UserId): Promise<Review[] | null> {
      try {
          const result = await ReviewModel.find({
              questionsId: questionsId.getValue(),
              userId: userId.getValue(),
          });
          if (!result) {
              return null;
          }
          return result.map((review) => toDomainModel(review));
      } catch (error) {
          console.error('Error finding reviews by question ID and user ID:', error);
          return null;
      }
  }

  async findAll(): Promise<Array<Review> | null> {
    const result = await ReviewModel.find();
    if (!result) {
      return null;
    }
    return result.map((review) => toDomainModel(review));
  }

  async delete(id: ReviewId): Promise<boolean> {
    const reviewId = id.getValue();
    const result = await ReviewModel.deleteOne({ id: reviewId });
    return result.deletedCount === 1;
  }

  async update(review: Review): Promise<boolean> {
    const reviewMongo = toMongoModel(review);
    const id = reviewMongo.id;
    const result = await ReviewModel.updateOne({ id }, reviewMongo);
    return result.modifiedCount === 1;
  }
}
