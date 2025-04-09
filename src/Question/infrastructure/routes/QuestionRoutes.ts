import { Router } from 'express';
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByLanguageId,
  updateQuestion,
} from '../controller/QuestionController';

const router = Router();

router.post('/', createQuestion);
router.get('/:id', getQuestionById);
router.get('/language/:languageId', getQuestionsByLanguageId);
router.get('/', getAllQuestions);
router.delete('/:id', deleteQuestion);
router.patch('/:id', updateQuestion);

export default router;
