import React from 'react';

const PasswordPop = ({ isOpen, cancelled, onClose, Create }) => {
  if (!isOpen) return null;

  return (
    <div className="z-1000">
      <div
        aria-hidden="true"
        className="fixed inset-0 items-center justify-center flex flex-wrap z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-start justify-between p-4  rounded-t border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900">Confirm Password Change</h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              > 
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <h1 className="text-red-500 text-center">
              ! Do you really want to change your password? This action cannot be reverted.
            </h1>
            <div className="flex items-center p-6 space-x-2  border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={Create}
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Confirm
              </button>
              <button
                onClick={cancelled}
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPop;
