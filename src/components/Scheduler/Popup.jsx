const PopupBox = ({ isOpen, eventData,message, onClose, cancelled, Create }) => {
  if (!isOpen) return null;
  console.log(message)
  return (
    <div class="z-1000">



      <div aria-hidden="true" class=" fixed inset-0  items-center justify-center flex flex-wrap  z-[1055]  h-full w-full overflow-y-auto overflow-x-hidden outline-none">
        <div class="relative w-full max-w-2xl  max-h-full">
          <div class="relative bg-white rounded-lg shadow ">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 ">
                Confirm Event Creation
              </h3>
              <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-6 space-y-6">
              <p class="text-base leading-relaxed text-gray-900 ">
                Hall: {eventData.slotName}
              </p>
              <p class="text-base leading-relaxed text-gray-900 ">
                Start: {eventData.start}
              </p>
              <p class="text-base leading-relaxed text-gray-900 ">
                End: {eventData.end}
              </p>
              {message&&(
              <p class="text-base leading-relaxed text-gray-900 ">
                {message}
              </p>)}
            </div>
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button onClick={Create} data-modal-hide="defaultModal" type="button" class="text-white bg-brand-500 hover:bg-brand-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Confirm</button>
              <button onClick={cancelled} data-modal-hide="defaultModal" type="button" class="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  ">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PopupBox


