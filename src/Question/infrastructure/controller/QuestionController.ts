import { Request, Response } from 'express';
import QuestionService from '../service/QuestionService';

const questionService = new QuestionService();

export async function createQuestion(req: Request, res: Response) {
  try {
    const { languageId, descriptions } = req.body;
    const result = await questionService.createQuestion(
      languageId,
      descriptions
    );
    if (result) {
      res.status(201).json({ message: 'Question created successfully' });
    } else {
      res.status(400).json({ message: 'Failed to create question' });
    }
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getQuestionById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const question = await questionService.findQuestionById(id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error('Error fetching question by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getQuestionsByLanguageId(req: Request, res: Response) {
  try {
    const { languageId } = req.params;
    const questions =
      await questionService.findQuestionsByLanguageId(languageId);
    if (questions && questions.length > 0) {
      res.status(200).json(questions);
    } else {
      res.status(404).json({ message: 'No questions found for this language' });
    }
  } catch (error) {
    console.error('Error fetching questions by language ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getAllQuestions(req: Request, res: Response) {
  try {
    const questions = await questionService.findAllQuestions();
    if (questions && questions.length > 0) {
      res.status(200).json(questions);
    } else {
      res.status(404).json({ message: 'No questions found' });
    }
  } catch (error) {
    console.error('Error fetching all questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteQuestion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await questionService.deleteQuestion(id);
    if (result) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete question' });
    }
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateQuestion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { languageId, descriptions } = req.body;
    const result = await questionService.updateQuestion(
      id,
      languageId,
      descriptions
    );
    if (result) {
      res.status(200).json({ message: 'Question updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update question' });
    }
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
