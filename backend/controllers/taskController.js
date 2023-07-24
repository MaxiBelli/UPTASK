import Project from "../models/Project.js";
import Task from "../models/Task.js";

// ADD TASK
const addTask = async (req, res) => {
  const { project } = req.body;

  const existsProject = await Project.findById(project);

  if (!existsProject) {
    const error = new Error("The Project does not exist");
    return res.status(404).json({ msg: error.message });
  }

  if (existsProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error("You don't have permission to add tasks");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const storedTask = await Task.create(req.body);
    // Store the ID in the project
    existsProject.tasks.push(storedTask._id);
    await existsProject.save();
    res.json(storedTask);
  } catch (error) {
    console.log(error);
  }
};

// GET TASK
const getTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ msg: error.message });
  }

  res.json(task);
};

// UPDATE TASK
const updateTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ msg: error.message });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.deadline = req.body.deadline || task.deadline;

  try {
    const storedTask = await task.save();
    res.json(storedTask);
  } catch (error) {
    console.log(error);
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await task.deleteOne();
    res.json({ msg: "The Task has been deleted" });
  } catch (error) {
    console.log(error);
  }
};

// CHANGE STATUS
const changeStatus = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask, changeStatus };
