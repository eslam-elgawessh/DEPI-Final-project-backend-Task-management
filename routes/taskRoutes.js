const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const {getTasks, postTasks, putTasks, deleteTasks} = require("../controllers/tasksControllers");


router.get("/tasks", getTasks);

router.post("/tasks", postTasks);

router.put("/tasks/:id", putTasks);
 
router.delete("/tasks/:id", deleteTasks);

module.exports = router;


