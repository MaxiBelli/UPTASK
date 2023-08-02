import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";
import Alert from "../../components/Alert";

const NewCollaborator = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { getProject, project, loading, collaborator, addCollaborator, alert } =
    useProjects();

  const { name, client } = project;

  useEffect(() => {
    getProject(params.id);
  }, []);

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
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
              clipRule="evenodd"
            />
          </svg>
          BACK
        </button>
      </div>
      <h1 className="font-black text-4xl">Project</h1>

      <div className=" bg-white shadow mt-4 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="flex-1 font-bold text-2xl">
              {name}
              <span className="text-xl font-semibold text-gray-500 uppercase p-2">
                {""} {client}
              </span>
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center text-4xl font-black mt-6">
        Add Collaborator
      </h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-5 text-3xl font-black">Result</h2>

              <div className="bg-slate-100 p-2 rounded-lg flex justify-between items-center">
                <p className="font-bold">{collaborator.name}</p>
                <p>{collaborator.email}</p>
                <button
                  type="button"
                  className="bg-sky-600 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    addCollaborator({
                      email: collaborator.email,
                    })
                  }
                >
                  Add to Project
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewCollaborator;
