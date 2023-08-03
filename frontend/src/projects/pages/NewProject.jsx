import { useNavigate } from "react-router-dom";
import SVGIcons from "../../assets/icons/SVGIcons";
import ProjectForm from "../components/ProjectForm";

const NewProject = () => {
  const navigate = useNavigate();
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
      <h1 className="text-center font-black text-4xl">Create Project</h1>

      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default NewProject;
