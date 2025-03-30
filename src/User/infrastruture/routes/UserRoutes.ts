import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByName,
  updateUser,
  userExists,
  userExistsByEmail,
} from '../controller/UserController';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.get('/name/:name', getUserByName);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.get('/exisis/:id', userExists);
router.get('/exisis/email/:email', userExistsByEmail);

export default router;
