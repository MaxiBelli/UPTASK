import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SVGIcons from "../../assets/icons/SVGIcons";

const ModalDelete = ({
  isOpen,
  onClose,
  title,
  message,
  onDeleteConfirmed,
}) => {
  const handleDelete = () => {
    onDeleteConfirmed();
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-red-100">
                {SVGIcons.warning}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                <Dialog.Title
                  as="h3"
                  className="text-2xl leading-6 font-bold text-gray-900 mt-4"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-lg text-gray-500">{message}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
              <button
                type="button"
                className="flex items-center justify-center w-full sm:w-auto sm:flex-shrink-0 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-sm uppercase"
                onClick={handleDelete}
              >
                <span className="mr-1">{SVGIcons.delete}</span>
                <span className="hidden sm:inline">Delete</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center mt-3 w-full sm:w-auto sm:mt-0 sm:flex-shrink-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm uppercase"
                onClick={onClose}
              >
                <span className="mr-1">{SVGIcons.cancel}</span>
                <span className="hidden sm:inline">Cancel</span>
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalDelete;
