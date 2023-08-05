import { Link } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import SVGIcons from "../../assets/icons/SVGIcons";

const ProjectPreview = ({ project }) => {
  const { auth } = useAuth();

  const { name, _id, client, creator } = project;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1 font-bold text-xl">
          {name}

          <span className="text-lg font-semibold  text-gray-500 uppercase">
            {""} {client}
          </span>
        </p>

        {auth._id !== creator && (
          <p className="p-1 text-sm rounded-lg text-white bg-green-500 font-bold uppercase">
            Collaborator
          </p>
        )}
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
