import Project from "../models/Project.js";
import Task from "../models/Task.js";

// ADD TASK
const addTask = async (req, res) => {
  const { project } = req.body;

  // Check if the project exists in the database
  const existsProject = await Project.findById(project);

  if (!existsProject) {
    const error = new Error("The Project does not exist");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project
  if (existsProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error("You don't have permission to add tasks");
    return res.status(403).json({ msg: error.message });
  }

  try {
    // Create the task and store its ID in the project's 'tasks' array
    const storedTask = await Task.create(req.body);
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

  // Find the task by its ID and populate its 'project' field with details of the project
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

  // Update task properties with the request body values, if available
  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.deadline = req.body.deadline || task.deadline;

  try {
    // Save the updated task to the database and respond with the stored task
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
    // Remove the task from the project's 'tasks' array and delete the task from the database
    const project = await Project.findById(task.project);
    project.tasks.pull(task._id);
    await Promise.allSettled([await project.save(), await task.deleteOne()]);
    res.json({ msg: "The Task has been deleted" });
  } catch (error) {
    console.log(error);
  }
};

// CHANGE STATUS
const changeStatus = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project or a collaborator
  if (
    task.project.creator.toString() !== req.user._id.toString() &&
    !task.project.collaborators.some(
      (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ msg: error.message });
  }

  // Toggle the task status and save the updated task
  task.status = !task.status;
  task.completedBy = req.user._id;
  await task.save();

  const taskStored = await Task.findById(id).populate("project").populate("completedBy");

  res.json(taskStored);
};

export { addTask, getTask, updateTask, deleteTask, changeStatus };
