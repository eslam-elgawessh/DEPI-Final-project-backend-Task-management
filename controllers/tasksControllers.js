
const Task = require('../models/task');

const getTasks = async (req, res) => {
  try {
    console.log('Query params:', req.query); 
    
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const tasks = await Task.find({ userId });
    console.log('Found tasks:', tasks); 
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Controller Error:', err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

const postTasks = async (req, res) => {
    const { userId, title, description, status } = req.body;
    try {
        if (!userId || !title) {
            return res.status(400).json({ message: "User ID and title are required" });
        }
        
        const newTask = new Task({ userId, title, description, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err: err.message });
    }
}



const putTasks = async (req, res) => {
    const { id } = req.params;
    const { userId, title, description, status } = req.body;
    
    try {
        const task = await Task.findOne({ _id: id, userId });
        if (!task) {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { title, description, status }, 
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err: err.message });
    }
}

const deleteTasks = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err: err.message });
    }
}

module.exports = { getTasks, postTasks, putTasks, deleteTasks };



