import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ProjectForm from "../../components/ProjectForm";

const EditProject = () => {
  const params = useParams();

  const { getProject, project, loading } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  if (loading) return "Loading...";

  return (
    <>
      <h1 className="font-black text-4xl">Edit Project: {name}</h1>
      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default EditProject;
