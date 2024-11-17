import express from 'express';
import { createTodo, updateTodo, getTodos, getTodo, deleteTodo } from './todo.controller';
import { authenticateToken } from '../login/login.controller';

const router = express.Router();

/**
 * Eli routes
 */
router.post('/', authenticateToken, createTodo);

router.patch('/:id', authenticateToken, updateTodo);

router.get('/', authenticateToken, getTodos);
router.get('/:id', authenticateToken, getTodo);

router.delete('/:id', authenticateToken, deleteTodo);

module.exports = router;