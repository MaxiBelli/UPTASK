import { Link } from "react-router-dom";
import useAuth from "../auth/hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hello: {auth.name}</p>

      <Link
        to="create-project"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg flex gap-2 items-center justify-center"
      >
        {" "}
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
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
