import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import SVGIcons from "../../assets/icons/SVGIcons";
import { PRIORITY } from "../constants/priorityTask";
import useProjects from "../hooks/useProjects";
import Alert from "../../components/Alert";

const ModalTaskForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  const params = useParams();

  const { modalTaskForm, handleModalTask, showAlert, alert, submitTask, task } =
    useProjects();

  useEffect(() => {
    setId(task?._id || "");
    setName(task?.name || "");
    setDescription(task?.description || "");
    setDeadline(task?.deadline?.split("T")[0] || "");
    setPriority(task?.priority || "");
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, priority].includes("")) {
      showAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    if (task._id) {
      await submitTask({
        id,
        name,
        description,
        deadline,
        priority,
        project: params.id,
      });
    } else {
      await submitTask({
        name,
        description,
        deadline,
        priority,
        project: params.id,
      });
    }

    setName("");
    setDescription("");
    setDeadline("");
    setPriority("");
  };

  const { msg } = alert;

  return (
    <Transition.Root show={modalTaskForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  onClick={handleModalTask}
                >
                  <span className="sr-only">Close</span>
                  {SVGIcons.cancel}
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-3xl leading-6 font-black text-gray-900"
                  >
                    {id ? "Edit Task" : "Create Task"}
                  </Dialog.Title>

                  {msg && <Alert alert={alert} />}

                  <form onSubmit={handleSubmit} className="my-10">
                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter a short and descriptive title for the Task."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
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
                        placeholder="Provide additional details about the Task."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-5 flex-col items-start">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm flex items-center gap-2"
                        htmlFor="deadline"
                      >
                        Deadline
                      </label>
                      <input
                        type="date"
                        id="deadline"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                      />
                    </div>

                    <div className="mb-5 flex-col items-start">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm flex items-center gap-2"
                        htmlFor="priority"
                      >
                        {SVGIcons.priority}
                        Priority
                      </label>
                      <div className="flex justify-between mt-2">
                        {PRIORITY.map((option) => (
                          <button
                            key={option.name}
                            type="button"
                            className={`py-2 px-4 rounded-md text-white text-xs font-bold uppercase ${
                              priority === option.name
                                ? option.bgColor
                                : "bg-gray-300 hover:bg-gray-400"
                            } w-24`}
                            onClick={() => setPriority(option.name)}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <input
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
                      value={id ? "Save Changes" : "Create Task"}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalTaskForm;
