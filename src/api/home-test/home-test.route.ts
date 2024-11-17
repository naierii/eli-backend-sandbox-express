import express from 'express';
import { getHomeTest } from './home-test.controller';

const router = express.Router();

router.get('/', getHomeTest);

module.exports = router;