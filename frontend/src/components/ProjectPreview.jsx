import { Link } from "react-router-dom";

const ProjectPreview = ({ project }) => {
  const { name, _id, client } = project;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {name}

          <span className="text-sm text-gray-500 uppercase">
            {""} {client}
          </span>
        </p>
      </div>

      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        View Project
      </Link>
    </div>
  );
};

export default ProjectPreview;
