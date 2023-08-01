import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import useProjects from "../hooks/useProjects";
import ModalDelete from "../components/ModalDelete";

const EditProject = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    getProject,
    project,
    loading,
    deleteProject,
    handleModalProjectDelete,
    modalProjectDelete,
  } = useProjects();

  const { name } = project;

  useEffect(() => {
    getProject(params.id);
  }, []);

  const handleProjectDelete = () => {
    deleteProject(params.id);
    handleModalProjectDelete();
  };

  if (loading) return "Loading...";

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
      <h1></h1>
      <h1 className="text-center font-black text-4xl">Edit Project</h1>
      <div className="flex justify-evenly">
        <h1 className="text-center font-black text-3xl mt-6">{name}</h1>

        <div className="flex items-center gap-2 mt-6 text-gray-400 hover:text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
          <button
            className="uppercase font-bold"
            onClick={handleModalProjectDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>

      <ModalDelete
        isOpen={modalProjectDelete}
        onClose={handleModalProjectDelete}
        title="Delete Project"
        message="A deleted Project cannot be recovered."
        onDeleteConfirmed={() => handleProjectDelete()}
      />
    </>
  );
};

export default EditProject;
