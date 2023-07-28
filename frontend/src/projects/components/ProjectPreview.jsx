import { Link } from "react-router-dom";

const ProjectPreview = ({ project }) => {
  const { name, _id, client } = project;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1 font-bold text-xl">
          {name}

          <span className="text-lg font-semibold  text-gray-500 uppercase">
            {""} {client}
          </span>
        </p>
      </div>

      <Link
        to={`${_id}`}
        className="flex items-center gap-2 text-gray-400 hover:text-sky-600 uppercase text-sm font-bold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-eye-fill"
          viewBox="0 0 16 16"
        >
          {" "}
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />{" "}
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />{" "}
        </svg>
      </Link>
    </div>
  );
};

export default ProjectPreview;
