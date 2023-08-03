import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthConfig } from "../helpers/getAuthConfig";
import clientAxios from "../../config/clientAxios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalTaskForm, setModalTaskForm] = useState(false);
  const [modalTaskDelete, setModalTaskDelete] = useState(false);
  const [modalProjectDelete, setModalProjectDelete] = useState(false);
  const [modalCollaboratorDelete, setModalCollaboratorDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const config = getAuthConfig();
        if (!config) return;

        const { data } = await clientAxios("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [projects]);

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
      const config = getAuthConfig();
      if (!config) return;

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
      const config = getAuthConfig();
      if (!config) return;

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
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // DELETE PROJECT
  const deleteProject = async (id) => {
    try {
      const config = getAuthConfig();
      if (!config) return;

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

  // HANDLE MODAL PROJECT DELETE
  const handleModalProjectDelete = () => {
    setModalProjectDelete(!modalProjectDelete);
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
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios.post("/tasks", task, config);

      setAlert({
        msg: "Task Created Successfully",
        error: false,
      });

      const updatedProject = { ...project };
      updatedProject.tasks.push(data);
      setProject(updatedProject);

      setTimeout(() => {
        setAlert({});
        setModalTaskForm(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TASK
  const editTask = async (task) => {
    try {
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

      setAlert({
        msg: "Task Created Successfully",
        error: false,
      });

      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(updatedProject);

      setTimeout(() => {
        setAlert({});
        setModalTaskForm(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE MODAL TASK EDIT
  const handleModalTaskEdit = (task) => {
    setTask(task);
    setModalTaskForm(true);
  };

  // HANDLE MODAL TASK DELETE
  const handleModalTaskDelete = (task) => {
    setTask(task);
    setModalTaskDelete(!modalTaskDelete);
  };

  // DELETE TASK
  const deleteTask = async () => {
    try {
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);

      setAlert({
        msg: data.msg,
        error: false,
      });

      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.filter(
        (taskState) => taskState._id !== data._id
      );
      setProject(updatedProject);
      setModalTaskDelete(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // SUBMIT COLLABORATOR
  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios.post(
        "/projects/collaborators",
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // ADD COLLABORATOR
  const addCollaborator = async (email) => {
    try {
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );

      setAlert({
        msg: data.msg,
        error: false,
      });
      setCollaborator({});

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // HANDLE MODAL COLLABORATOR DELETE
  const handleModalCollaboratorDelete = (collaborator) => {
    setModalCollaboratorDelete(!modalCollaboratorDelete);
    setCollaborator(collaborator);
  };

  // DELETE COLLABORATOR
  const deleteCollaborator = async () => {
    try {
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios.post(
        `/projects/remove-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const updatedProject = { ...project };

      updatedProject.collaborators = updatedProject.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator._id
      );

      setProject(updatedProject);
      setAlert({
        msg: data.msg,
        error: false,
      });
      setCollaborator({});
      setModalCollaboratorDelete(false);

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  // COMPLETE TASK
  const completeTask = async (id) => {
    try {
      const config = getAuthConfig();
      if (!config) return;

      const { data } = await clientAxios.post(
        `/tasks/status/${id}`,
        {},
        config
      );

      const updatedProject = { ...project };

      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );

      setProject(updatedProject);

      setTask({});
      setAlert({});
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        addCollaborator,
        alert,
        collaborator,
        completeTask,
        deleteCollaborator,
        deleteProject,
        deleteTask,
        getProject,
        handleModalCollaboratorDelete,
        handleModalProjectDelete,
        handleModalTask,
        handleModalTaskDelete,
        handleModalTaskEdit,
        loading,
        modalCollaboratorDelete,
        modalProjectDelete,
        modalTaskDelete,
        modalTaskForm,
        project,
        projects,
        showAlert,
        submitCollaborator,
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
