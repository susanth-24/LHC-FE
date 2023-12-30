import React, { Component } from 'react'
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, DemoData } from 'react-big-scheduler'
import withDragDropContext from './withDnDContext'
import 'react-big-scheduler/lib/css/style.css'
import { getRoomBook } from '../../actions/rooms';
import { fetchRequests, fetchRooms, getBlocks } from '../../api';
import EventPop from './EventPop';
import CollidePop from './CollidePop';
import PopupBox from './Popup';

function getNumberWithSuffix(number) {
    const lastDigit = number % 10;
    const secondLastDigit = Math.floor((number % 100) / 10);

    if (secondLastDigit === 1) {
        return `${number}th`;
    } else {
        switch (lastDigit) {
            case 1:
                return `${number}st`;
            case 2:
                return `${number}nd`;
            case 3:
                return `${number}rd`;
            default:
                return `${number}th`;
        }
    }
}
function convertRequestsToEvents(requests) {
    const userb = JSON.parse(localStorage.getItem('profile'));

    console.log(userb)
    return requests?.map((request, index) => {
        let bgColor;
        let title;
        let status;
        let r1 = request.requestStatus_1;
        let r2 = request.requestStatus_2;
        let r3 = request.requestStatus_3;
        if (request.requestStatus_1 === 'Approved' && request.requestStatus_2 === 'Approved' && request.requestStatus_3 === 'Approved') {
            bgColor = '#00FF00';
            status = true;
            title = `Club ${request.name} has Booked ${request.RoomName} for Session: ${request.sessionName} (Approved)`;

        } else if (request.requestStatus_1 === 'Pending' && request.requestStatus_2 === 'Pending' && request.requestStatus_3 === 'Pending') {
            bgColor = '#0000FF';
            status = true;
            title = `Club ${request.name} has Requested to Book ${request.RoomName} for Session: ${request.sessionName} (Pending)`;

        } else if (request.requestStatus_1 === 'Pending' && request.requestStatus_2 === 'Pending' && request.requestStatus_3 === 'Approved') {
            bgColor = '#0000FF';
            status = true;
            title = `Club ${request.name} has Requested to Book ${request.RoomName} for Session: ${request.sessionName} (Pending)`;
        } else if (request.requestStatus_1 === 'Pending' && request.requestStatus_2 === 'Approved' && request.requestStatus_3 === 'Approved') {
            bgColor = '#0000FF';
            status = true;
            title = `Club ${request.name} has Requested to Book ${request.RoomName} for Session: ${request.sessionName} (Pending)`;
        } else if (request.requestStatus_1 === 'Pending' && request.requestStatus_2 === 'Pending' && request.requestStatus_3 === 'Declined') {
            bgColor = 'red';
            status = false;
            title = `Booking Request by Club ${request.name} for ${request.RoomName} (Declined)`;

        } else if (request.requestStatus_1 === 'Pending' && request.requestStatus_2 === 'Declined' && request.requestStatus_3 === 'Approved') {
            bgColor = 'red';
            status = false;
            title = `Booking Request by Club ${request.name} for ${request.RoomName} (Declined)`;
        } else if (request.requestStatus_1 === 'Declined' && request.requestStatus_2 === 'Approved' && request.requestStatus_3 === 'Approved') {
            bgColor = 'red';
            status = false;
            title = `Booking Request by Club ${request.name} for ${request.RoomName} (Declined)`;
        } else if (request.requestStatus_1 === 'Withdrawed' && request.requestStatus_2 === 'Withdrawed' && request.requestStatus_3 === 'Withdrawed') {
            bgColor = '#964B00';
            status = false;
            title = `Booking has been withdrawd by Club ${request.name} for ${request.RoomName} (Withdrawed)`;
        }else {
            status = true;
            bgColor = 'BBBBFF';
            title = `Club ${request.name} has Booked ${request.RoomName} for Session: ${request.sessionName}`;
        }

        return {
            id: index + 1,
            title: title,
            resourceId: request.RoomId,
            start: `${request.date} ${request.startTime}`,
            end: `${request.date} ${request.endTime}`,
            bgColor: bgColor,
            resizable: false,
            movable: false,
            draggable: false,
            status: status,
            email: request.email,
            r1: r1,
            r2: r2,
            r3: r3
        };
    });
}


function convertRequestsToEvent(requests) {
    const userb = JSON.parse(localStorage.getItem('profile'));

    console.log(userb)
    return requests?.map((request, index) => {
        let bgColor;
        let title;
        let status;
        let r1 = request.requestStatus_1;
        let r2 = request.requestStatus_2;
        let r3 = request.requestStatus_3;
        if (request.requestStatus_1 === 'Approved' && request.requestStatus_2 === 'Approved' && request.requestStatus_3 === 'Approved') {
            bgColor = '#00FF00';
            status = true;
            title = `Club ${request.name} has Booked ${request.RoomName} for Session: ${request.sessionName} (Approved)`;
        } else if (request.requestStatus_1 === 'Pending' || request.requestStatus_2 === 'Pending' || request.requestStatus_3 === 'Pending') {
            bgColor = '#0000FF';
            if (request.email === userb?.result?.email) {
                status = true;
            }
            else {
                status = false;

            }
            title = `Club ${request.name} has Requested to Book ${request.RoomName} for Session: ${request.sessionName} (Pending)`;
        } else if (request.requestStatus_1 === 'Declined' || request.requestStatus_2 === 'Declined' || request.requestStatus_3 === 'Declined') {
            bgColor = 'red';
            status = false;
            title = `Booking Request by Club ${request.name} for ${request.RoomName} (Declined)`;
        } else if (request.requestStatus_1 === 'Withdrawed') {
            bgColor = '#964B00';
            status = false;
            title = `Booking has been withdrawd by Club ${request.name} for ${request.RoomName} (Withdrawed)`;
        } else {
            status = false;
            bgColor = '#0000FF';
            title = `Club ${request.name} has Booked ${request.RoomName} for Session: ${request.sessionName}`;
        }

        return {
            id: index + 1,
            title: title,
            resourceId: request.RoomId,
            start: `${request.date} ${request.startTime}`,
            end: `${request.date} ${request.endTime}`,
            bgColor: bgColor,
            resizable: false,
            movable: false,
            draggable: false,
            status: status,
            email: request.email,
            r1: r1,
            r2: r2,
            r3: r3
        };
    });
}

function convertBlockToEvents(requests) {
    return requests?.map((request, index) => {
        let bgColor;
        let title;
        let status;
        let r1 = request.requestStatus_1;
        let r2 = request.requestStatus_2;
        let r3 = request.requestStatus_3;
        if (request.isRecurring === false) {
            return {
                id: index + 1,
                title: request.title,
                resourceId: request.roomName,
                start: request.start,
                end: request.end,
                bgColor: '#000000',
                resizable: false,
                movable: false,
                draggable: false,
                email: request.email,
                status: request.status,
                r1: 'Approved',
                r2: 'Approved',
                r3: 'Approved'
            }
        }
        else {
            return {
                id: index + 1,
                title: request.title,
                resourceId: request.roomName,
                start: request.start,
                end: request.end,
                bgColor: '#000000',
                resizable: false,
                email: request.email,
                movable: false,
                draggable: false,
                status: request.status,
                r1: 'Approved',
                r2: 'Approved',
                r3: 'Approved',
                rrule: request.rrule,
            }
        }


    });
}

function convertRooms(rooms) {
    const reversedRooms = rooms?.reverse();
    return reversedRooms?.map((room) => {


        return {
            id: room._id,
            name: room.RoomName,
        };
    });
}
class Basic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewModel: null,
            isPopupOpen: false,
            isPopupOpen1: false,
            isPopupOpen2: false,
            isPopupOpen3: false,
            isPopupOpen4: false,
            ismessage: null,
            isCancelled: false,
            newEventData: null,
            createTrue: false,
            INITIAL_EVENTS: null,
            rooms_name: null,
        }
    }
    async componentDidMount() {
        try {
            const requests = await fetchRequests();
            const rooms = await fetchRooms();
            const block = await getBlocks();
            console.log(block.data)
            const INITIAL_EVENTS = convertRequestsToEvents(requests.data);
            const rooms_name = convertRooms(rooms.data.data);
            const new_block = convertBlockToEvents(block.data);
            const newCombinedEvents = [...INITIAL_EVENTS, ...new_block];
            console.log(newCombinedEvents)


            const newEvent = {
                id: 5,
                start: '2023-10-16 17:00:00',
                end: '2023-10-16 18:00:00',
                resourceId: '64fb4e7849f8c392a8ba0b39',
                title: 'R2 has recurring tasks every week on Monday and Friday',
                rrule: 'FREQ=WEEKLY;BYDAY=MO,FR;UNTIL=20231116T000000Z',
                bgColor: '#f759ab',
            };


            this.setState({
                INITIAL_EVENTS: newCombinedEvents,
                rooms_name: rooms_name,
            }, () => {
                console.log(this.state.INITIAL_EVENTS)

                const date = new Date();
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);

                const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                const besidesWidth = screenWidth > 1024 ? 300 : 20;
                console.log(besidesWidth)

                let schedulerData = new SchedulerData(formattedDate, ViewTypes.Day, false, false, {
                    views: [
                        {
                            viewName: 'Day',
                            viewType: 0,
                            showAgenda: false,
                            isEventPerspective: false,
                        },
                    ],
                    dayCellWidth: 50,
                    besidesWidth: besidesWidth,
                    tableHeaderHeight: 60,
                    dayStartFrom: 6,
                    dayStopTo: 22,
                    dayMaxEvents: 999,
                    customMaxEvents: 999,
                    // minuteStep: 15
                });
                schedulerData.setResources(this.state.rooms_name);

                schedulerData.setEvents(this.state.INITIAL_EVENTS);
                this.setState({ viewModel: schedulerData })
                console.log(schedulerData)
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    render() {
        if (!this.state.viewModel) {
            return <div>Loading...</div>;
        }

        const { viewModel } = this.state;
        console.log(viewModel)
        return (
            <div className='flex-grow  font-sans font-medium'>

                <div>
                    <Scheduler schedulerData={viewModel}
                        prevClick={this.prevClick}
                        nextClick={this.nextClick}
                        onSelectDate={this.onSelectDate}
                        onViewChange={this.onViewChange}
                        eventItemClick={this.eventClicked}
                        updateEventStart={this.updateEventStart}
                        updateEventEnd={this.updateEventEnd}
                        //moveEvent={this.moveEvent}
                        newEvent={this.newEvent}
                    />
                    {this.state.isPopupOpen && (
                        <PopupBox
                            isOpen={this.state.isPopupOpen}
                            eventData={this.state.newEventData}
                            message={this.state.ismessage}

                            onClose={this.closePOP}
                            cancelled={this.cancelEventCreation}
                            Create={this.createEvent}
                        />
                    )}
                    {this.state.isPopupOpen1 && (
                        <EventPop
                            isOpen1={this.state.isPopupOpen1}
                            eventData1={this.state.newEventData}
                            onClose1={this.closePOP1}
                        />
                    )}
                    {this.state.isPopupOpen2 && (
                        <CollidePop
                            isOpen2={this.state.isPopupOpen2}
                            message={`The selected slot is already booked, Choose another slot!`}
                            onClose2={this.closePOP2}
                        />
                    )}
                    {this.state.isPopupOpen3 && (
                        <CollidePop
                            isOpen2={this.state.isPopupOpen3}
                            message={`You cannot create an event in the past`}
                            onClose2={this.closePOP3}
                        />
                    )}
                    {this.state.isPopupOpen4 && (
                        <CollidePop
                            isOpen2={this.state.isPopupOpen4}
                            message={`You already have made one request in this slot`}
                            onClose2={this.closePOP4}
                        />
                    )}
                </div>
            </div>
        )
    }
    closePOP = () => {
        this.setState({ isPopupOpen: false });
    }
    closePOP1 = () => {
        this.setState({ isPopupOpen1: false });
    }
    closePOP2 = () => {
        this.setState({ isPopupOpen2: false });
    }
    closePOP3 = () => {
        this.setState({ isPopupOpen3: false });
    }
    closePOP4 = () => {
        this.setState({ isPopupOpen4: false });
    }
    cancelEventCreation = () => {
        console.log("rep")
        this.setState({
            isPopupOpen: false,
            newEventData: null,
        });
    };
    prevClick = (schedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(this.state.INITIAL_EVENTS);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData) => {
        schedulerData.next();
        console.log(schedulerData)
        schedulerData.setEvents(this.state.INITIAL_EVENTS);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.state.INITIAL_EVENTS);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        console.log(schedulerData)

        schedulerData.setDate(date);
        schedulerData.setEvents(this.state.INITIAL_EVENTS);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        console.log(event)
        this.setState({
            isPopupOpen1: true,
            newEventData: event,
        });
    };


    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        const userb = JSON.parse(localStorage.getItem('profile'));
        const collidingEvents = schedulerData.events.filter((event) => {
            //console.log(end)
            return (
                event.resourceId === slotId &&
                new Date(event.start) < new Date(end) &&
                new Date(event.end) > new Date(start) &&
                event.status === true &&
                event.email !== userb?.result?.email
            );
        });
        const pendingEvents = schedulerData.events.filter((event) => {
            return (
                event.resourceId === slotId &&
                new Date(event.start) < new Date(end) &&
                new Date(event.end) > new Date(start) &&
                event.status !== true
            );
        });
        console.log(start)
        const collidingEvents_1 = schedulerData.events.filter((event) => {
            return (
                event.resourceId === slotId &&
                new Date(event.start) < new Date(end) &&
                new Date(event.end) > new Date(start) &&
                event.status === true &&
                event.email === userb?.result?.email
            );
        });
        const now = new Date();
        const targetDateTimeString = start;
        const targetDateTime = new Date(targetDateTimeString);


        if (collidingEvents.length > 0) {
            //message={`The selected slot is already booked!`}
            this.setState({
                isPopupOpen2: true,
            });
        }
        else if (targetDateTime < now) {
            //message={`You cannot create an event in the past`}
            this.setState({
                isPopupOpen3: true,
            });
        }
        else if (collidingEvents_1.length > 0) {
            //message={`You already have made one request in this slot`}
            this.setState({
                isPopupOpen4: true,
            });
        }
        else {
            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if (item.id >= newFreshId) {
                    newFreshId = item.id + 1;
                }
            });

            let newEvent = {
                id: newFreshId,
                slotName: slotName,
                start: start,
                end: end,
                resourceId: slotId,
            };
            let message = [`${getNumberWithSuffix(pendingEvents.length + 1)} priority will be given to your request`]

            console.log(message)
            this.setState({
                isPopupOpen: true,
                newEventData: newEvent,
                ismessage: message,
            });
        }

    };



    createEvent = () => {

        const { viewModel, newEventData } = this.state;
        //const dateTimeString = "2017-12-19 15:50:00";


        const dateTime_s = new Date(newEventData.start);
        const dateTime_e = new Date(newEventData.end);
        const date_s = `${dateTime_s.getFullYear()}-${(dateTime_s.getMonth() + 1).toString().padStart(2, '0')}-${dateTime_s.getDate().toString().padStart(2, '0')}`;

        const time_s = `${dateTime_s.getHours().toString().padStart(2, '0')}:${dateTime_s.getMinutes().toString().padStart(2, '0')}`;
        const time_e = `${dateTime_e.getHours().toString().padStart(2, '0')}:${dateTime_e.getMinutes().toString().padStart(2, '0')}`;

        this.props.dispatch(getRoomBook(newEventData.resourceId, date_s, time_s, time_e), this.props.navigate);
        this.props.navigate(`/Book/${newEventData.resourceId}`)
        // Close the popup
        this.setState({
            //viewModel,
            isPopupOpen: false,
            newEventData: null,
        });
    };

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    }
}

export default withDragDropContext(Basic)