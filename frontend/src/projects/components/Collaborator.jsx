import SVGIcons from "../../assets/icons/SVGIcons";
import useProjects from "../hooks/useProjects";
import ModalDelete from "./ModalDelete";

const Collaborator = ({ collaborator }) => {
  const {
    handleModalCollaboratorDelete,
    modalCollaboratorDelete,
    deleteCollaborator,
  } = useProjects();

  const { name, email } = collaborator;

  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p className="text-xl font-bold">{name}</p>
          <p className="text-base text-gray-700 mt-1">{email}</p>
        </div>

        <div>
          <button
            type="button"
            className="flex items-center gap-2 bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalCollaboratorDelete(collaborator)}
          >
            {SVGIcons.delete}
            Delete
          </button>
        </div>
      </div>
      <ModalDelete
        isOpen={modalCollaboratorDelete}
        onClose={handleModalCollaboratorDelete}
        title="Delete Collaborator"
        message="Once removed, this person will not be able to access the project"
        onDeleteConfirmed={() => deleteCollaborator(collaborator)}
      />
    </>
  );
};

export default Collaborator;
