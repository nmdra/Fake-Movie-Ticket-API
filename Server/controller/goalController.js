// https://www.npmjs.com/package/express-async-handler
import Goal from '../model/goalModel.js';

export const getAllGoals = async (_req, res, next) => {
    try {
        const goal = await Goal.find();
        res.status(200).json(goal);
    } catch (error) {
        next(error);
    }
};

export const getGoal = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400)
        throw new Error('Invalid request');
    }

    const goal = await Goal.findById(id);

    res.status(200).json(goal);
};

export const addGoal = async (req, res, next) => {
    try {
        if (!req.body.text) {
            res.status(400);
            throw new Error('Invalid request');
        }

        const goal = await Goal.create({
            text: req.body.text,
        });

        res.status(200).json(goal);
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};


export const updateGoal = async (req, res) => {
    res.status(200).json({ message: 'update Goal' });
};

export const deleteGoal = async (req, res) => {
    res.status(200).json({ message: 'delete Goal' });
};
