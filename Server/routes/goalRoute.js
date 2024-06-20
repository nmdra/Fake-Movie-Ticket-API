import express from 'express';
import * as goal from '../controller/goalController.js';

const router = express.Router();

router.route('/').get(goal.getAllGoals).post(goal.addGoal)
router.route('/:id').get(goal.getGoal)
                    .put(goal.updateGoal)
                    .patch(goal.updateGoal)
                    .delete(goal.deleteGoal)

export default router;