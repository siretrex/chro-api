const mongoose = require('mongoose');
const Task = require('../models/task');
const User = require('../models/user');

const updateTask = async (req, res) => {
    const { userId, taskId, taskContent, minutes } = req.body;

    const mins = Number(minutes);
    if (isNaN(mins) || mins < 0) {
        return res.status(400).json({ message: "Minutes must be a positive number" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const taskInstance = await Task.findById(taskId).session(session);
        const userInstance = await User.findById(userId).session(session);

        if (!taskInstance || !userInstance) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Task or User not found" });
        }

        taskInstance.total_minutes += mins;
        userInstance.total_minutes += mins;

        taskInstance.actions.push({
            content: taskContent,
            minutes: mins
        });

        await taskInstance.save({ session });
        await userInstance.save({ session });

        await session.commitTransaction();
        session.endSession();

        const safeUser = userInstance.toObject();
        delete safeUser.password;

        res.status(200).json({
            message: "Work Done",
            user: safeUser
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateTask;
