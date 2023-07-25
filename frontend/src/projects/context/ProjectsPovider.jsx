import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../../config/clientAxios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalTaskForm, setModalTaskForm] = useState(false);
  const [task, setTask] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clientAxios("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  // SHOW ALERT
  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  // SUBMIT PROJECT ---> NEW or EDIT
  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  // EDIT PROJECT
  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );

      const updatedProjects = projects.map(
        (
          projectState // Synchronize state
        ) => (projectState._id === data._id ? data : projectState)
      );
      setProjects(updatedProjects);

      setAlert({
        msg: "Project Updated Successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // NEW PROJECT
  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/projects", project, config);

      setProjects([...projects, data]);

      setAlert({
        msg: "Project Created Successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // GET PROJECT
  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE PROJECT
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/projects/${id}`, config);

      const updatedProjects = projects.filter(
        // Synchronize state
        (projectState) => projectState._id !== id
      );
      setProjects(updatedProjects);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE MODAL TASK
  const handleModalTask = () => {
    setModalTaskForm(!modalTaskForm);
    setTask({});
  };

  // SUBMIT TASK
  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  // CREATE TASK
  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/tasks", task, config);

      const updatedProject = { ...project };
      updatedProject.tasks = { ...project.tasks, data };
      setProject(updatedProject);

      setAlert({});
      setModalTaskForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TASK
  const editTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(updatedProject);

      setAlert({});
      setModalTaskForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTaskEdit = (task) => {
    setTask(task);
    setModalTaskForm(true);
  };

  return (
    <ProjectsContext.Provider
      value={{
        alert,
        deleteProject,
        getProject,
        handleModalTask,
        handleModalTaskEdit,
        loading,
        modalTaskForm,
        project,
        projects,
        showAlert,
        submitProject,
        submitTask,
        task,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
