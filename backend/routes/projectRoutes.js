import express from "express";

import {
  getProjects,
  createProject,
  getProject,
  editProject,
  deleteProject,
  searchCollaborator,
  addCollaborator,
  removeCollaborator,
} from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, getProjects).post(checkAuth, createProject);

router
  .route("/:id")
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);
  
router.post("/collaborators", checkAuth, searchCollaborator);
router.post("/collaborators/:id", checkAuth, addCollaborator);
router.post("/remove-collaborator/:id", checkAuth, removeCollaborator);

export default router;
