import { Router } from "express";
import { createLanguage, deleteOne, getAll, getById, getByName, update } from "../controller/LanguageController";

const router = Router();

router.post('/', createLanguage);
router.get('/:id', getById);
router.get('/name/:name', getByName);
router.get('/', getAll);
router.delete('/:id', deleteOne);
router.patch('/:id', update);

export default router;
