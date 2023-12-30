
import React, { useState, useEffect } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Tooltip } from "bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getRequests } from '../../actions/requests'

let tooltipInstance = null;
function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}



function convertRequestsToEvents(requests) {
    return requests.map((request, index) => {
      let color;
      
      if (request.requestStatus === 'Approved') {
        color = 'green'; // Green for Approved
      } else if (request.requestStatus === 'Pending') {
        color = 'blue'; // Blue for Pending
      } else if (request.requestStatus === 'Declined') {
        color = 'red'; // Red for Declined
      } else {
        color = 'gray'; 
      }
  
      const description = `Club ${request.name}\nBooked ${request.RoomName}\nSession: ${request.sessionName}`;
  
      return {
        id: index + 1,
        title: request.RoomName,
        start: `${request.date}T${request.startTime}`,
        end: `${request.date}T${request.endTime}`,
        color: color, 
        extendedProps: {
          description: description 
        }
      };
    });
  }
export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const dispatch = useDispatch();
  const requests = useSelector(state => state.requests.requests);

  useEffect(() => {
    dispatch(getRequests());
  }, []);
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };
  const INITIAL_EVENTS = convertRequestsToEvents(requests);
    console.log(INITIAL_EVENTS)
  const renderSidebar = () => {
    return (
        <div className='w-72 leading-6 bg-blue-100 border-r border-blue-200'>
            <div className='px-2 py-2'>
                <h2>Instructions</h2>
                <ul>
                    <li>Green indicates the booking is</li>
                    <li>Drag, drop, and resize events</li>
                    <li>Click an event to delete it</li>
                </ul>
            </div>
            <div className='px-2 py-2'>
                <label>
                    <input
                        type='checkbox'
                        checked={this?.state?.weekendsVisible}
                        onChange={this?.handleWeekendsToggle}
                    ></input>
                    toggle weekends
                </label>
            </div>
            <div className='px-2 py-2'>
                <h2>All Events ({this?.state?.currentEvents.length})</h2>
                <ul>
                    {this?.state?.currentEvents?.map(renderSidebarEvent)}
                </ul>
            </div>
        </div>
    )
  };

  

  const handleMouseEnter = (info) => {
    if (info.event.extendedProps.description) {
        tooltipInstance = new Tooltip(info.el, {
            title: info.event.extendedProps.description,
            html: true,
            placement: "top",
            trigger: "hover",
            container: "body",
            template: '<div class="tooltip top z-30" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner bg-black text-white rounded"></div></div>'
        });

        tooltipInstance.show();
    }
  };

  const handleMouseLeave = (info) => {
    if (tooltipInstance) {
        tooltipInstance.dispose();
        tooltipInstance = null;
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  return (
    <div className='flex min-h-full font-sans font-medium'>
      {renderSidebar()}
      <div className='flex-grow px-3 py-3'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={false}
          selectable={false}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          eventContent={renderEventContent}
          eventsSet={handleEvents}
          eventMouseEnter={(info) => handleMouseEnter(info)}
          eventMouseLeave={(info) => handleMouseLeave(info)}
        />
      </div>
    </div>
  );
}
