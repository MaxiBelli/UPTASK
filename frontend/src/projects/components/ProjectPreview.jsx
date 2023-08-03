import { Link } from "react-router-dom";
import SVGIcons from "../../assets/icons/SVGIcons";

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
        {SVGIcons.view}
      </Link>
    </div>
  );
};

export default ProjectPreview;
