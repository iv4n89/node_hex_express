import { Router } from 'express';
import {
  changePassword,
  login,
  refreshToken,
  register,
  validateToken,
} from '../controller/AuthController';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/validate-token', validateToken);
router.post('/refresh-token', refreshToken);
router.post('/change-password', changePassword);

export default router;
