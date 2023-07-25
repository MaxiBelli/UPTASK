import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ModalTaskForm from "../../components/ModalTaskForm";
import Task from "../../components/Task";

const Project = () => {
  const params = useParams();

  const { getProject, project, loading, handleModalTask } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  if (loading) return "Loading...";

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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

          <Link
            to={`/projects/edit/${params.id}`}
            className="uppercase font-bold"
          >
            Edit
          </Link>
        </div>
      </div>
      <button
        onClick={handleModalTask}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white 
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
      <p className="font-black text-2xl mt-10">Project Tasks</p>

      <div className="bg-white shadow mt-5 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center text-xl text-gray-500 font-bold p-5">
            There are no tasks in this project
          </p>
        )}
      </div>

      <ModalTaskForm />
    </>
  );
};

export default Project;
