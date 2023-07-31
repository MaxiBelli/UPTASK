import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

// GET PROJECTS
const getProjects = async (req, res) => {
  // Find projects where the 'creator' field equals the user making the request
  const projects = await Project.find()
    .where("creator")
    .equals(req.user)
    .select("-tasks");
  res.json(projects);
};

// CREATE PROJECT
const createProject = async (req, res) => {
  // Create a new project with the request body and set the creator to the user's ID
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    // Save the project to the database and respond with the stored project
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

// GET PROJECT
const getProject = async (req, res) => {
  const { id } = req.params;

  // Find the project by its ID and populate its 'tasks' field with task details
  const project = await Project.findById(id).populate("tasks");

  if (!project) {
    const error = new Error("Not Found");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(401).json({ msg: error.message });
  }

  res.json(project);
};

// EDIT PROJECT
const editProject = async (req, res) => {
  const { id } = req.params;

  // Find the project by its ID
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Not Found");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(401).json({ msg: error.message });
  }

  // Update project properties with the request body values, if available
  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deadline = req.body.deadline || project.deadline;
  project.client = req.body.client || project.client;

  try {
    // Save the updated project to the database and respond with the stored project
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  const { id } = req.params;

  // Find the project by its ID
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Not Found");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(401).json({ msg: error.message });
  }

  try {
    // Delete the project from the database and respond with a success message
    await project.deleteOne();
    res.json({ msg: "Project Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

// SEARCH COLLABORATOR
const searchCollaborator = async (req, res) => {
  const { email } = req.body;
  // Find the user by their email in the database and select only necessary fields
  const user = await User.findOne({ email }).select(
    "-confirmed -createdAt -password -token -updatedAt -__v "
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  // Respond with the user data (excluding sensitive information)
  res.json(user);
};

// ADD COLLABORATOR
const addCollaborator = async (req, res) => {
  // Find the project by its ID in the database
  const project = await Project.findById(req.params.id);

  // Check if the project exists
  if (!project) {
    const error = new Error("Project Not Found");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  // Find the user by their email in the database and select only the necessary fields
  const user = await User.findOne({ email }).select(
    "-confirmed -createdAt -password -token -updatedAt -__v "
  );

  // Check if the user exists
  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  // Check that the new collaborator is not the creator of the project
  if (project.creator.toString() === user._id.toString()) {
    const error = new Error("The Project Creator cannot be a collaborator");
    return res.status(404).json({ msg: error.message });
  }

  // Check if the user is already a collaborator of the project
  if (project.collaborators.includes(user._id)) {
    const error = new Error("The User already belongs to the Project");
    return res.status(404).json({ msg: error.message });
  }

  // If everything is fine, add the new collaborator to the project's collaborators list
  project.collaborators.push(user._id);
  await project.save();
  res.json({ msg: "Collaborator Added Successfully" });
};

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
