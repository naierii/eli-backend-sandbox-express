import express from 'express';
import { createTodo, updateTodo, getTodos, getTodo, deleteTodo } from './todo.controller';

const router = express.Router();

/**
 * Eli routes
 */
router.post('/', createTodo);

router.patch('/:id', updateTodo);

router.get('/', getTodos);
router.get('/:id', getTodo);

router.delete('/:id', deleteTodo);

module.exports = router;