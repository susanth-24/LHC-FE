const EventPop = ({ isOpen1, eventData1, onClose1}) => {
    if (!isOpen1) return null;
    console.log(eventData1)
    return (
      <div class="z-1000">
  
  
  
        <div aria-hidden="true" class=" fixed inset-0  items-center justify-center flex flex-wrap  z-[1055]  h-full w-full overflow-y-auto overflow-x-hidden outline-none">
          <div class="relative w-full max-w-2xl  max-h-full">
            <div class="relative bg-white rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 ">
                  Event Description
                </h3>
                <button type="button" onClick={onClose1} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6 space-y-1">
                
                <p class="text-base leading-relaxed text-gray-900 ">
                  Desc: {eventData1.title}
                </p>
                <p class="text-base leading-relaxed text-gray-900 ">
                  Status of the request by the club:
                </p>
                <p class="text-base leading-relaxed text-gray-900 ">
                   Admin Approval: {eventData1.r1}
                </p>
                <p class="text-base leading-relaxed text-gray-900 ">
                   FA Approval: {eventData1.r2}
                </p>
                <p class="text-base leading-relaxed text-gray-900 ">
                   GS Approval: {eventData1.r3}
                </p>

                <p class="text-base leading-relaxed text-gray-900 ">
                  Start: {eventData1.start}
                </p>
                <p class="text-base leading-relaxed text-gray-900 ">
                  End: {eventData1.end}
                </p>
              </div>
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
  
  export default EventPop
  
  
  