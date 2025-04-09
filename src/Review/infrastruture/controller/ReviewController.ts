import { Request, Response } from 'express';
import ReviewService from '../service/ReviewService';

const reviewService = new ReviewService();

export async function createReview(req: Request, res: Response) {
  try {
    const { userId, questionsId, answers } = req.body;
    const rewiew = await reviewService.save(userId, questionsId, answers);
    if (!rewiew) {
      res.status(400).json({ message: 'Review already exists' });
    }
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function getReviewById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const review = await reviewService.findById(id);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function getReviewByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const reviews = await reviewService.findByUserId(userId);
    if (!reviews) {
      res.status(404).json({ message: 'Reviews not found' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function getReviewByQuestionsId(req: Request, res: Response) {
  try {
    const { questionsId } = req.params;
    const reviews = await reviewService.findByQuestionsId(questionsId);
    if (!reviews) {
      res.status(404).json({ message: 'Reviews not found' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function getAllReviews(req: Request, res: Response) {
  try {
    const reviews = await reviewService.findAll();
    if (!reviews) {
      res.status(404).json({ message: 'Reviews not found' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await reviewService.delete(id);
    if (!result) {
      res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    const result = await reviewService.update(id, answers);
    if (!result) {
      res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
