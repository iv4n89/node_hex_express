import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  getReviewByQuestionsId,
  getReviewByQuestionsIdAndUserId,
  getReviewByUserId,
  updateReview,
} from '../controller/ReviewController';

const router = Router();

router.post('/', createReview);
router.get('/:id', getReviewById);
router.get('/user/:userId', getReviewByUserId);
router.get('/questions/:questionsId', getReviewByQuestionsId);
router.get('/user/:userId/questions/:questionsId', getReviewByQuestionsIdAndUserId);
router.get('/', getAllReviews);
router.delete('/:id', deleteReview);
router.patch('/:id', updateReview);

export default router;
