import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SVGIcons from "../../assets/icons/SVGIcons";
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

  const { name, client } = project;

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
          {SVGIcons.back}
          BACK
        </button>
      </div>
      <h1 className="font-black text-4xl">Project</h1>

      <div className="bg-white shadow mt-4 rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center">
            <p className="font-bold text-2xl mr-4">{name}</p>
            <span className="text-xl font-semibold text-gray-500 uppercase">
              {client}
            </span>
          </div>
          <div className="flex items-center mt-6 md:mt-0">
            <div className="group">
              <button
                className="uppercase font-bold ml-1 flex items-center text-gray-400 hover:text-red-600"
                onClick={handleModalProjectDelete}
              >
                {SVGIcons.delete}
                <span className="ml-1">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center font-black text-4xl mt-6">Edit Project</h1>

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
