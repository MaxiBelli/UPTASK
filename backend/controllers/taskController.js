import Project from "../models/Project.js";
import Task from "../models/Task.js";

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
    res.json(storedTask);
  } catch (error) {
    console.log(error);
  }
};

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

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const changeStatus = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask, changeStatus };
