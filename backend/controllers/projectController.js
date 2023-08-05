import Project from "../models/Project.js";
import User from "../models/User.js";

// GET PROJECTS
const getProjects = async (req, res) => {
  // Find projects where the 'creator' field or 'collaborators' field contains the user making the request
  const projects = await Project.find({
    $or: [{ collaborators: { $in: req.user } }, { creator: { $in: req.user } }],
  }).select("-tasks");
  res.json(projects);
};

// CREATE PROJECT
const createProject = async (req, res) => {
  // Create a new project instance with the request body and set the creator to the user's ID
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

  // Find the project by its ID and populate its 'tasks' and 'collaborators' fields with relevant details
  const project = await Project.findById(id)
    .populate({
      path: "tasks",
      populate: { path: "completedBy", select: "name" },
    })
    .populate("collaborators", "name email");

  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project or a collaborator
  if (
    project.creator.toString() !== req.user._id.toString() &&
    !project.collaborators.some(
      (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("Unauthorized access");
    return res.status(401).json({ msg: error.message });
  }

  res.json(project);
};

// EDIT PROJECT
const editProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Unauthorized action");
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
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  // Verify if the user making the request is the creator of the project
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Unauthorized action");
    return res.status(401).json({ msg: error.message });
  }

  try {
    // Delete the project from the database and respond with a success message
    await project.deleteOne();
    res.json({ msg: "Project deleted successfully" });
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

  res.json(user);
};

// ADD COLLABORATOR
const addCollaborator = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Unauthorized action");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  // Find the user by their email in the database and select only the necessary fields
  const user = await User.findOne({ email }).select(
    "-confirmed -createdAt -password -token -updatedAt -__v "
  );

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
  res.json({ msg: "Collaborator added successfully" });
};

// REMOVE COLLABORATOR
const removeCollaborator = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Unauthorized action");
    return res.status(404).json({ msg: error.message });
  }

  // It's fine, we can remove the collaborator
  project.collaborators.pull(req.body.id);
  await project.save();
  res.json({ msg: "Collaborator removed successfully" });
};

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
