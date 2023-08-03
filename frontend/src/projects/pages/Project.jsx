import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SVGIcons from "../../assets/icons/SVGIcons";
import useProjects from "../hooks/useProjects";
import useAdmin from "../../hooks/useAdmin";
import { formatDate } from "../helpers/formatDate";
import ModalTaskForm from "../components/ModalTaskForm";
import ModalDelete from "../components/ModalDelete";
import Task from "../components/Task";
import Alert from "../../components/Alert";
import Collaborator from "../components/Collaborator";

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
  const admin = useAdmin();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name, client, description, deadline } = project;
  const [showProjectDeleteAlert, setShowProjectDeleteAlert] = useState(false);
  const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false);

  const { msg } = alert;

  if (loading) return "Loading...";

  return msg && alert.error ? (
    <Alert alert={alert} />
  ) : (
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
      {showProjectDeleteAlert && msg && <Alert alert={alert} />}
      <div className="bg-white shadow mt-4 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="flex-1 font-bold text-2xl">
              {name}
              <span className="text-xl font-semibold text-gray-500 uppercase p-2">
                {""} {client}
              </span>
            </p>
            <p className="text-lg text-gray-600 my-2">{description}</p>
            <p className="text-lg ">{formatDate(deadline)}</p>
          </div>

          {admin && (
            <div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-yellow-500">
                <Link
                  to={`/projects/edit/${params.id}`}
                  className="uppercase font-bold flex items-center"
                >
                  {SVGIcons.edit}
                  <span className="ml-1">Edit</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-gray-400 hover:text-red-500">
                <button
                  className="uppercase font-bold flex items-center"
                  onClick={handleModalProjectDelete}
                >
                  {SVGIcons.delete}
                  <span className="ml-1">Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {admin && (
        <button
          onClick={handleModalTask}
          type="button"
          className="text-base px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white 
        text-center mt-5 flex gap-2 items-center justify-center"
        >
          {SVGIcons.add}
          New Task
        </button>
      )}
      <p className="font-black text-3xl mt-10">Tasks</p>

      {showTaskDeleteAlert && msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-5 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center text-xl text-gray-800 font-bold p-5">
            There are no tasks in this project
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex justify-between items-center mt-10">
            <p className="font-black text-3xl">Collaborators</p>
            <Link
              to={`/projects/new-collaborator/${project._id}`}
              className="text-gray-400 hover:text-sky-600 uppercase font-bold flex items-center p-4"
            >
              {" "}
              {SVGIcons.add}
              Add
            </Link>
          </div>

          {!showProjectDeleteAlert && !showTaskDeleteAlert && msg && (
            <Alert alert={alert} />
          )}

          <div className="bg-white shadow mt-5 rounded-lg">
            {project.collaborators?.length ? (
              project.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className="text-center text-lg text-gray-800 font-bold p-5">
                There are no collaborators in this project
              </p>
            )}
          </div>
        </>
      )}

      <ModalTaskForm />
      <ModalDelete
        isOpen={modalTaskDelete || modalProjectDelete}
        onClose={
          modalTaskDelete ? handleModalTaskDelete : handleModalProjectDelete
        }
        title={modalTaskDelete ? "Delete Task" : "Delete Project"}
        message={
          modalTaskDelete
            ? "A deleted Task cannot be recovered"
            : "A deleted Project cannot be recovered"
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
