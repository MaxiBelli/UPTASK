import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";

const ProjectsLayout = () => {
  const { auth } = useAuth();

  return <>{auth._id ? "Authenticate" : <Navigate to="/" />}</>;
};

export default ProjectsLayout;
