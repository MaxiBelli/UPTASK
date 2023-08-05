import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import BackButton from "../components/BackButton";
import CollaboratorForm from "../components/CollaboratorForm";
import Loader from "../components/Loader";


const NewCollaborator = () => {
  const params = useParams();

  const { getProject, project, loading, collaborator, addCollaborator, alert } =
    useProjects();

  const { name, client } = project;

  useEffect(() => {
    getProject(params.id);
  }, []);

  return (
    <>
      <BackButton />
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
      <h1 className="text-center text-4xl font-black mt-6">Add Collaborator</h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
      {loading ? (
        <p className="text-center"><Loader/></p>
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
