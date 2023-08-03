import React from "react";
import Icons from "../../assets/icons/SVGIcons";
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
        <p className="mb-1 text-base text-gray-700">{description}</p>
        <p className="mb-1 text-base">{formatDate(deadline)}</p>
        <span
          className={`py-1 rounded-lg text-center mt-1 text-white font-bold text-sm ${
            PRIORITY.find((p) => p.name === priority)?.bgColor || "bg-gray-500"
          } w-24`}
        >
          {priority}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="flex items-center gap-2 bg-yellow-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalTaskEdit(task)}
          >
            {Icons.edit} Edit
          </button>
        )}
        <button
          className={`${
            status ? "bg-gray-500" : "bg-green-600"
          } w-36 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg flex items-center gap-2 flex-shrink-0`}
          onClick={() => completeTask(_id)}
        >
          {status ? Icons.check : Icons.checked}
          {status ? "Incomplete" : "Complete"}
        </button>
        {admin && (
          <button
            className="flex items-center gap-2 bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalTaskDelete(task)}
          >
            {Icons.delete} Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
