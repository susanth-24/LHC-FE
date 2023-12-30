import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Tooltip } from "bootstrap";

let tooltipInstance = null;


export default class DemoApp extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: []
    }
    

    render() {
        const INITIAL_EVENTS = this?.props?.events;
        console.log(INITIAL_EVENTS)
        if (!INITIAL_EVENTS || INITIAL_EVENTS.length === 0) {
            // Data is not available or empty, you can render a loading message or spinner here
            return <div>Loading...</div>;
        }
        let eventGuid = 0
        let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


        return (
            <div className='flex min-h-full font-sans font-medium'>
                {this.renderSidebar()}
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
                        windowResize={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={INITIAL_EVENTS}
                        eventContent={renderEventContent}
                        eventsSet={this.handleEvents}
                        eventMouseEnter={(info) => this.handleMouseEnter(info)}
                        eventMouseLeave={(info) => this.handleMouseLeave(info)}
                        //eventClick={window.alert("helo")}
                    />
                </div>
            </div>
        )
    }

    renderSidebar() {
        return (
            <div className='w-72 leading-6 bg-blue-100 border-r border-blue-200'>
                <div className='px-2 py-2'>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Instructions:</h2>
                    <ul className="list-disc pl-5">
                        <li className="text-green-600">Green indicates the booking is approved</li>
                        <li className="text-red-600">Red indicates the booking is declined</li>
                        <li className="text-blue-600">Blue indicates the booking is Pending</li>
                        <li className="text-amber-800">Brown indicates the booking is Withdrawed</li>
                        <li className="text-black">Hover on the events to get more details</li>

                        
                    </ul>
                </div>

                <div className='px-2 py-2'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                {/* <div className='px-2 py-2'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div> */}
            </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }
    handleMouseEnter = (info) => {
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






    handleMouseLeave = (info) => {
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
    };





    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

// function renderSidebarEvent(event) {
//     return (
//         <li key={event.id}>
//             <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
//             <i>{event.title}</i>
//         </li>
//     )
// }