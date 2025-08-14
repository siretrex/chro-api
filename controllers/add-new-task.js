
const Task = require('../models/task');
const User = require('../models/user')

const addNewTask = async (req, res) => {
    const { task_name,userId } = req.body;
    try {
       
        const newTask = await Task.create({ task_name });
        await newTask.save()

        // Find the user and push the new task ID
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        userData.tasks.push(newTask._id);
        await userData.save(); 
        const {tasks} = userData
        console.log(tasks)
        res.status(200).json({ message: "Work done", tasks });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: "Work not done", error: error.message });
    }
};

module.exports = addNewTask;
