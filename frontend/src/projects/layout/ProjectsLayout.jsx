import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";

const ProjectsLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return "Loading...";
  return <>{auth._id ? "Authenticate" : <Navigate to="/" />}</>;
};

export default ProjectsLayout;
