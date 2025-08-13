const Task = require("../models/task");

const sendTaskDetails = async (req, res) => {
    const { tasks } = req.body;

    try {
        const detailedTaskList = await Promise.all(
            tasks.map(taskId => Task.findById(taskId))
        );

        res.status(200).json({ message: "Done", detailedTaskList });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Error fetching tasks" });
    }
};


module.exports = sendTaskDetails;

