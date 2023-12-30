import React, { useEffect } from 'react';

const CollidePop = ({ isOpen2, message, onClose2 }) => {

  if (!isOpen2) return null;
  return (
    <div class="z-1000 bg-opacity-70">



      <div aria-hidden="true" class=" fixed inset-0  items-center justify-center flex flex-wrap  z-[1055]  h-full w-full overflow-y-auto overflow-x-hidden outline-none">
        <div class="relative w-full max-w-2xl  max-h-full">
          <div class="relative bg-white rounded-lg shadow ">

            <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>

                <div>
                  <p class="font-bold">Event Error</p>
                  <p class="text-sm">{message}</p>
                </div>
                <button type="button" onClick={onClose2} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            {/* <div class="p-6 space-y-6">
                
                <p class="text-base leading-relaxed text-gray-900 ">
                 {message}
                </p>
              </div> */}
            {/* <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={Create} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm</button>
                <button onClick={cancelled} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
              </div> */}
          </div>
        </div>
      </div>
    </div>

  );
};

export default CollidePop


