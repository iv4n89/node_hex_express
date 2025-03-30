import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  getReviewByUserId,
  updateReview,
} from '../controller/ReviewController';

const router = Router();

router.post('/', createReview);
router.get('/:id', getReviewById);
router.get('/user/:userId', getReviewByUserId);
router.get('/', getAllReviews);
router.delete('/:id', deleteReview);
router.patch('/:id', updateReview);

export default router;
