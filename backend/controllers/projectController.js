import Project from "../models/Project.js";
import User from "../models/User.js";

const getProjects = async (req, res) => {};

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

const getProject = async (req, res) => {};

const editProject = async (req, res) => {};

const deleteProject = async (req, res) => {};

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
