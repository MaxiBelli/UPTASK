import SVGIcons from "../../assets/icons/SVGIcons";
import { formatDate } from "../helpers/formatDate";
import { PRIORITY } from "../constants/priorityTask";
import useProjects from "../hooks/useProjects";
import useAdmin from "../../hooks/useAdmin";

const Task = ({ task }) => {
  const { handleModalTaskEdit, handleModalTaskDelete, completeTask } =
    useProjects();
  const admin = useAdmin();

  const { description, name, priority, deadline, status, _id } = task;

  return (
    <div className="border-b p-4 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl font-bold">{name}</p>
        <p className="mb-1 text-lg text-gray-700">{description}</p>
        <div className="flex items-center gap-2 text-sm bg-gray-500 rounded-lg p-2 text-white font-bold">
          {SVGIcons.calendar}
          <span className="ml-2">{formatDate(deadline)}</span>
        </div>
        <div
          className={`flex items-center gap-2 py-1 px-2 mt-1 text-white font-bold text-sm uppercase ${
            PRIORITY.find((p) => p.name === priority)?.bgColor
          } rounded-lg w-26`}
        >
          {SVGIcons.priority}
          {priority}
        </div>
        {status && (
          <p className="flex items-center gap-2 text-sm font-bold bg-green-600 p-2 mt-2 rounded-lg text-white">
            {SVGIcons.checked} {task.completedBy.name}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:items-end">
        {admin && (
          <button
            className="flex items-center gap-2 px-4 py-3 text-white uppercase font-bold text-sm bg-indigo-600 rounded-lg"
            onClick={() => handleModalTaskEdit(task)}
          >
            {SVGIcons.edit} Edit
          </button>
        )}
        <button
          className={`flex items-center gap-2 flex-shrink-0 w-36 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg ${
            status ? "bg-green-600" : "bg-gray-500"
          }`}
          onClick={() => completeTask(_id)}
        >
          {status ? SVGIcons.checked : SVGIcons.check}
          {status ? "Complete" : "Incomplete"}
        </button>
        {admin && (
          <button
            className="flex items-center gap-2 px-4 py-3 text-white uppercase font-bold text-sm bg-red-600 rounded-lg"
            onClick={() => handleModalTaskDelete(task)}
          >
            {SVGIcons.delete} Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
