import { Link } from "react-router-dom";
import UptaskIcon from "../../assets/icons/uptask.png"
import SVGIcons from "../../assets/icons/SVGIcons";
import useProjects from "../hooks/useProjects";
import Search from "./Search";

const Header = () => {
  const { handleSearcher } = useProjects();

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={UptaskIcon} alt="My Icon" className="w-12 h-12 mr-2" />

          <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
            UpTask
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link to="/projects" className=" text-lg font-bold uppercase">
            Projects
          </Link>
          <button type="button" onClick={handleSearcher}>
            {SVGIcons.search}
          </button>
          <button
            type="button"
            className="text-white text-base bg-sky-600 p-3 rounded-md uppercase font-bold"
          >
            Logout
          </button>
          <Search/>
        </div>
      </div>
    </header>
  );
};

export default Header;
