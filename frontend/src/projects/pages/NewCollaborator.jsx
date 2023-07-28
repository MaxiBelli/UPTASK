import { useEffect } from "react";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import Alert from "../../components/Alert";

const NewCollaborator = () => {
  const { getProject, project , loading} = useProjects();

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if(loading) return "Loading..."

  return (
    <>
      <h1 className="text-center text-4xl font-black">Add Collaborator to Project: {project.name}</h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
    </>
  );
};

export default NewCollaborator;
