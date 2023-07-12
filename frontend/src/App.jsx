import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./auth/layout/AuthLayout";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import ForgotPassword from "./auth/pages/ForgotPassword";
import NewPassword from "./auth/pages/NewPassword";
import ConfirmAccount from "./auth/pages/ConfirmAccount";

import { AuthProvider } from "./auth/context/AuthProvider";

import ProjectsLayout from "./projects/layout/ProjectsLayout";
import Projects from "./projects/pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
