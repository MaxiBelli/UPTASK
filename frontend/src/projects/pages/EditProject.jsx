import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "../../components/ProjectForm";
import useProjects from "../hooks/useProjects";
import Swal from "sweetalert2";

const EditProject = () => {
  const params = useParams();

  const { getProject, project, loading, deleteProject } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const handleClick = () => {
    Swal.fire({
      title: "Are you sure you want to delete this project?",
      text: "Once deleted, you can't get it back!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(params.id);
      }
    });
  };

  const { name } = project;

  if (loading) return "Loading...";

  return (
    <>
      <h1 className="text-center font-black text-4xl uppercase">Edit Project</h1>
      <div className="flex justify-evenly">
        <h1 className="text-center font-black text-3xl mt-6">{name}</h1>

        <div className="flex items-center gap-2 mt-6 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          <button className="uppercase font-bold" onClick={handleClick}>
            Delete
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default EditProject;
