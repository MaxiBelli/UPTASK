import { useEffect } from "react";
import io from "socket.io-client";
import useProjects from "../hooks/useProjects";
import Alert from "../../components/Alert";
import BackButton from "../components/BackButton";
import ProjectPreview from "../components/ProjectPreview";

let socket;

const Projects = () => {
  const { projects, alert } = useProjects();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const { msg } = alert;

  return (
    <>
      <BackButton />

      <h1 className="text-3xl font-black">Projects</h1>

      {msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <ProjectPreview key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-xl text-gray-500 font-bold p-5">
            No projects yet
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
