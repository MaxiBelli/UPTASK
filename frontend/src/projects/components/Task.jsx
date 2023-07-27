import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { handleModalTaskEdit, handleModalTaskDelete } = useProjects();

  const { description, name, priority, deadline, status, _id } = task;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl font-bold">{name}</p>
        <p className="mb-1 text-lg text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{formatDate(deadline)}</p>
        <p className="mb-1 text-gray-600">Priority: {priority}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        <button
          className=" flex items-center gap-2 bg-yellow-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalTaskEdit(task)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
        </button>

        <button
          className={`${
            status ? "bg-green-400" : "bg-green-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {status ? "Incomplete" : "Complete"}
        </button>

        <button
          className="flex items-center gap-2 bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalTaskDelete(task)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
