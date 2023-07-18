import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./auth/layout/AuthLayout";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import ForgotPassword from "./auth/pages/ForgotPassword";
import NewPassword from "./auth/pages/NewPassword";
import ConfirmAccount from "./auth/pages/ConfirmAccount";
import ProjectsLayout from "./projects/layout/ProjectsLayout";
import Projects from "./projects/pages/Projects";
import NewProject from "./projects/pages/NewProject";
import Project from "./projects/pages/Project";

import { AuthProvider } from "./auth/context/AuthProvider";
import { ProjectsProvider } from "./projects/context/ProjectsPovider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/projects" element={<ProjectsLayout />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
