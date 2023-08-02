import useProjects from "../projects/hooks/useProjects";
import useAuth from "../auth/hooks/useAuth";

const useAdmin = () => {
  const { project } = useProjects();
  const { auth } = useAuth();
  return project.creator === auth._id;
};

export default useAdmin;
