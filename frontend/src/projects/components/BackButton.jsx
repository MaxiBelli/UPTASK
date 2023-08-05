import { useNavigate } from "react-router-dom";
import SVGIcons from "../../assets/icons/SVGIcons";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-20 right-8 text-gray-400 hover:text-gray-800 flex items-center gap-2 mt-6">
      <button
        onClick={() => navigate(-1)}
        className="uppercase font-bold flex items-center gap-1"
      >
        {SVGIcons.back}
        BACK
      </button>
    </div>
  );
};

export default BackButton;