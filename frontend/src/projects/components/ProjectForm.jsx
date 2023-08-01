import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Alert from "../../components/Alert";

const ProjectForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [client, setClient] = useState("");

  const [showSubmitButton, setShowSubmitButton] = useState(true);

  const params = useParams();
  const { showAlert , alert, submitProject , project } = useProjects();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeadline(project.deadline?.split("T")[0]);
      setClient(project.client);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, client].includes("")) {
      showAlert({
        msg: "All Fields are Required",
        error: true,
      });

      return;
    }

    // Pass the data to the provider
    await submitProject({ id, name, description, deadline, client });

    setId(null);
    setName("");
    setDescription("");
    setDeadline("");
    setClient("");

    setShowSubmitButton(false);
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Project Name
        </label>

        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="description"
        >
          Description
        </label>

        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="deadline"
        >
          Deadline
        </label>

        <input
          id="deadline"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="client"
        >
          Client Name
        </label>

        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      {showSubmitButton && (
        <input
          type="submit"
          value={id ? "Update Project" : "Create Project"}
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      )}
    </form>
  );
};

export default ProjectForm;
