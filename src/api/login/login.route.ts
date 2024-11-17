import express from 'express';
import { authenticateToken, login } from './login.controller';

const router = express.Router();

router.post('/', login);

module.exports = router;