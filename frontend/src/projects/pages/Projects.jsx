import { useNavigate } from "react-router-dom";
import SVGIcons from "../../assets/icons/SVGIcons";
import useProjects from "../hooks/useProjects";
import ProjectPreview from "../components/ProjectPreview";
import Alert from "../../components/Alert";

const Projects = () => {
  const navigate = useNavigate();

  const { projects, alert } = useProjects();
  const { msg } = alert;

  return (
    <>
      <div className="absolute top-20 right-8 text-gray-400 hover:text-gray-800 flex items-center gap-2 mt-6">
        <button
          className="uppercase font-bold flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          {SVGIcons.back}
          BACK
        </button>
      </div>
      <h1 className="text-3xl font-black">Projects</h1>

      {msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <ProjectPreview key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-xl text-gray-500  font-bold p-5">
            No projects yet
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
