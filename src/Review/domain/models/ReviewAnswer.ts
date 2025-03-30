import ReviewAnswer from '../valueObject/ReviewAnswer';
import ReviewComment from '../valueObject/ReviewComment';

export interface IReviewAnswer {
  id: number;
  answer: ReviewAnswer;
  comment: ReviewComment;
}
