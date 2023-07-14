import { useContext } from "react";
import ProjectsContext from "../context/ProjectsPovider";

const useProjects = () => {
  return useContext(ProjectsContext);
};

export default useProjects;
