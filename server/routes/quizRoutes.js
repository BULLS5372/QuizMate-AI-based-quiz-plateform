
import express from 'express';
import {
    createQuiz,
    getQuizzes,
    getQuizById,
    submitQuiz, 
    deleteQuiz, 
    getQuizResponses, 
    getResponseDetail 
} from '../controllers/quizControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.delete('/:id', protect, deleteQuiz);
router.post('/:id/submit', submitQuiz);
router.get('/:id/responses', protect, getQuizResponses);
router.get('/:quizId/responses/:responseId', protect, getResponseDetail);

export default router;
