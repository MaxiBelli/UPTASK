import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ModalTaskForm from "../components/ModalTaskForm";
import ModalDelete from "../components/ModalDelete";
import Task from "../components/Task";
import Alert from "../../components/Alert";
import { formatDate } from "../helpers/formatDate";

const Project = () => {
  const params = useParams();
  const navigate = useNavigate();

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

  const { name, client, description, deadline } = project;
  const [showProjectDeleteAlert, setShowProjectDeleteAlert] = useState(false);
  const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false);

  if (loading) return "Loading...";

  const { msg } = alert;

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
      <h1 className="font-black text-3xl">Project</h1>
      {showProjectDeleteAlert && msg && <Alert alert={alert} />}
      <div className=" bg-white shadow mt-4 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="flex-1 font-bold text-3xl">
              {name}
              <span className="text-2xl font-semibold text-gray-500 uppercase p-2">
                {""} {client}
              </span>
            </p>
            <p className="text-xl my-2">{description}</p>
            <p className="text-xl ">{formatDate(deadline)}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-yellow-500">
              <Link
                to={`/projects/edit/${params.id}`}
                className="uppercase font-bold flex items-center"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
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
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
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
      <p className="font-black text-2xl mt-10">Tasks</p>

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
        <p className="font-black text-2xl">Collaborators</p>
        <Link
          to={`/projects/new-collaborator/${project._id}`}
          className="text-gray-400 hover:text-sky-600 uppercase font-bold flex items-center p-4"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
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
