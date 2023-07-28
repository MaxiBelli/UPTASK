import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ModalTaskForm from "../components/ModalTaskForm";
import ModalDelete from "../components/ModalDelete";
import Task from "../components/Task";
import Alert from "../../components/Alert";

const Project = () => {
  const params = useParams();

  const {
    getProject,
    project,
    loading,
    handleModalTask,
    alert,
    modalTaskDelete,
    handleModalTaskDelete,
    deleteTask,
    deleteProject,
    handleModalProjectDelete,
    modalProjectDelete,
  } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;
  const [showProjectDeleteAlert, setShowProjectDeleteAlert] = useState(false);
  const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false);

  if (loading) return "Loading...";

  const { msg } = alert;

  return (
    <>
      {showProjectDeleteAlert && msg && <Alert alert={alert} />}
      <div className="flex justify-between items-center">
        <h1 className="font-black text-4xl">{name}</h1>
        <div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-yellow-500">
            <Link
              to={`/projects/edit/${params.id}`}
              className="uppercase font-bold flex items-center"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </Link>
          </div>

          <div className="flex items-center gap-2 text-gray-400 hover:text-red-500">
            <button
              className="uppercase font-bold flex items-center"
              onClick={handleModalProjectDelete}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleModalTask}
        type="button"
        className="text-base px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white 
        text-center mt-5 flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
        New Task
      </button>
      <p className="font-bold text-2xl mt-10">Project Tasks</p>

      {showTaskDeleteAlert && msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-5 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center text-xl text-gray-500 font-bold p-5">
            There are no tasks in this project
          </p>
        )}
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="font-bold text-2xl">Collaborators</p>
        <Link
          to={`/projects/new-collaborator/${project._id}`}
          className="text-gray-400 hover:text-sky-600 uppercase font-bold flex items-center"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add
        </Link>
      </div>
      <ModalTaskForm />
      <ModalDelete
        isOpen={modalTaskDelete || modalProjectDelete}
        onClose={
          modalTaskDelete ? handleModalTaskDelete : handleModalProjectDelete
        }
        title={modalTaskDelete ? "Delete Task" : "Delete Project"}
        message={
          modalTaskDelete
            ? "A deleted Task cannot be recovered."
            : "A deleted Project cannot be recovered."
        }
        onDeleteConfirmed={() => {
          if (modalTaskDelete) {
            deleteTask(params.id);
            setShowTaskDeleteAlert(true);
          } else {
            deleteProject(params.id);
            setShowProjectDeleteAlert(true);
          }
        }}
      />
    </>
  );
};

export default Project;
