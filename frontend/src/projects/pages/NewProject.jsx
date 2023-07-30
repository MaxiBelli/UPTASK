import { useNavigate } from "react-router-dom";
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
              clip-rule="evenodd"
            />
          </svg>
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
