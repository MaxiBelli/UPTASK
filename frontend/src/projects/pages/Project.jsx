
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SVGIcons from "../../assets/icons/SVGIcons";
import { formatDate } from "../helpers/formatDate";
import useAdmin from "../../hooks/useAdmin";
import useProjects from "../hooks/useProjects";
import Alert from "../../components/Alert";
import BackButton from "../components/BackButton";
import Collaborator from "../components/Collaborator";
import ModalDelete from "../components/ModalDelete";
import ModalTaskForm from "../components/ModalTaskForm";
import Task from "../components/Task";
import Loader from "../components/Loader";

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
  const admin = useAdmin();

  useEffect(() => {
    getProject(params.id);
  }, []);

  console.log(project);

  const { name, client, description, deadline } = project;
  const [showProjectDeleteAlert, setShowProjectDeleteAlert] = useState(false);
  const [showTaskDeleteAlert, setShowTaskDeleteAlert] = useState(false);

  const { msg } = alert;

  if (loading) return <Loader/>;

  return (
    <>
      <BackButton />
      <h1 className="text-3xl font-black">Project</h1>
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
            <p className="text-xl text-gray-600 my-2">{description}</p>
            <div className="flex items-center mb-1 text-base">
              <div className="bg-gray-500 rounded-lg p-2 text-white flex items-center gap-2 font-bold">
                {SVGIcons.calendar}
                <span className="ml-2">{formatDate(deadline)}</span>
              </div>
            </div>
          </div>

          {admin && (
            <div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-indigo-600">
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
          className="w-full md:w-auto px-5 py-3 mt-5 text-base font-bold uppercase text-white bg-sky-400 text-center flex items-center justify-center gap-2 rounded-lg"
        >
          {SVGIcons.add}
          New Task
        </button>
      )}
      <p className="mt-5 font-black text-2xl">Tasks</p>

      {showTaskDeleteAlert && msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-5 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="p-5 text-xl font-bold text-center text-gray-800">
            There are no tasks in this project
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex justify-between items-center mt-10">
            <p className="font-black text-2xl">Collaborators</p>
            <Link
              to={`/projects/new-collaborator/${project._id}`}
              className="p-4 text-gray-400 hover:text-sky-600 uppercase font-bold flex items-center"
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
              <p className="p-5 text-xl font-bold text-center text-gray-800">
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
