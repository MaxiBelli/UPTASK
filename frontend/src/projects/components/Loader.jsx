import loaderIcon from '../../../public/uptask.png';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-1/4 screen">
      <img src={loaderIcon} alt="Loader Icon" className="animate-spin h-36 w-36" />
    </div>
  );
};

export default Loader;