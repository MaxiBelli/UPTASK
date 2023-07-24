import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

// GET PROJECTS
const getProjects = async (req, res) => {
  const projects = await Project.find()
    .where("creator")
    .equals(req.user)
    .select("-tasks");
  res.json(projects);
};

// CREATE PROJECT
const createProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

// GET PROJECT
const getProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id).populate("tasks");

  if (!project) {
    const error = new Error("Not Found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(401).json({ msg: error.message });
  }

  res.json(project);
};

// EDIT PROJECT
const editProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Not Found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(401).json({ msg: error.message });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deadline = req.body.deadline || project.deadline;
  project.client = req.body.client || project.client;

  try {
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Not Found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await project.deleteOne();
    res.json({ msg: "Project Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const searchCollaborator = async (req, res) => {};

const addCollaborator = async (req, res) => {};

const removeCollaborator = async (req, res) => {};

export {
  getProjects,
  createProject,
  getProject,
  editProject,
  deleteProject,
  searchCollaborator,
  addCollaborator,
  removeCollaborator,
};
