import express from 'express';
import stageGirlsController from './stage-girls.controller';

const router = express.Router();

console.log('stage-girls route');

router.get('/', stageGirlsController);
router.get('/:firstName', stageGirlsController);

module.exports = router;