import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { getRooms } from '../../actions/rooms'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { blockroom, deleteBlock, getBlocks } from '../../actions/block';

function generateSentenceFromRRULE(rruleString) {
    if (!rruleString) {
        return "No recurrence rule specified.";
    }

    const rruleParts = rruleString.split(';');
    let frequency = '';
    let daysOfWeek = '';
    let untilDate = '';
    const daysMap = {
        MO: 'Monday',
        TU: 'Tuesday',
        WE: 'Wednesday',
        TH: 'Thursday',
        FR: 'Friday',
        SA: 'Saturday',
        SU: 'Sunday',
    };

    for (const part of rruleParts) {
        const [key, value] = part.split('=');
        switch (key) {
            case "FREQ":
                frequency = value.toLowerCase();
                break;
            case "BYDAY":
                const days = value.split(',');
                const dayNames = days.map(day => daysMap[day]);
                daysOfWeek = dayNames.join(' and ');
                break;
            case "UNTIL":
                //const until = new Date(value);
                const year = parseInt(value.slice(0, 4));
                const month = parseInt(value.slice(4, 6)) - 1;
                const day = parseInt(value.slice(6, 8));
                const date = new Date(Date.UTC(year, month, day));
                untilDate = date.toISOString().split('T')[0]
                break;
        }
    }

    return `This event occurs ${frequency} on ${daysOfWeek} until ${untilDate}.`;
}

function generateRecurrenceRule(isRecurring, selectedDays, endDate) {
    if (!isRecurring) {
        return '';
    }

    const daysMap = {
        MO: 'Monday',
        TU: 'Tuesday',
        WE: 'Wednesday',
        TH: 'Thursday',
        FR: 'Friday',
        SA: 'Saturday',
        SU: 'Sunday',
    };
    const selectedFullDays = selectedDays.map((day) => daysMap[day]);

    const selectedDaysString = selectedDays.join(',');

    // const formattedEndDate = endDate.toISOString().slice(0, 4) +
    //   endDate.toISOString().slice(5, 7) +
    //   endDate.toISOString().slice(8, 13).replace(':', '') +
    //   '00Z';

    const rrule = `FREQ=WEEKLY;BYDAY=${selectedDaysString};UNTIL=${endDate}`;

    return rrule;
}


const MainHold = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getRooms());
    }, [])
    useEffect(() => {
        dispatch(getBlocks());
    }, [])
    const blocks = useSelector((state) => state?.blocks?.blocks);
    console.log(blocks);
    const [currentId, setCurrentId] = useState(0);

    const { rooms, isLoading } = useSelector((state) => state.rooms);
    console.log(rooms)
    const [eventData, setEventData] = useState({
        title: 'Blocked Room',
        roomName: '',
        room: '',
        start: '',
        end: '',
        isRecurring: false,
        endDate: '',
        recurringDays: [],
        rrule: '',
        status: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setEventData({ ...eventData, [name]: e.target.checked });
        } else if (type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.options)
                .filter((option) => option.selected)
                .map((option) => option.value);
            setEventData({ ...eventData, [name]: selectedOptions });
        } else {
            setEventData({ ...eventData, [name]: value });
        }
    };


    const convertToUTC = (localTime) => {
        const localDate = new Date(localTime);
        const utcFormattedDate = localDate.toISOString().split('T')[0].replace(/-/g, '') + 'T000000Z';
        return utcFormattedDate;
    };
    const formatdate = (newp) => {
        const inputFormat = "YYYY-MM-DDTHH:mm";
        const outputFormat = "YYYY-MM-DD HH:mm:ss";

        const parsedDatetime = moment(newp, inputFormat);

        const formattedDatetimeStr = parsedDatetime.format(outputFormat);

        return formattedDatetimeStr;
    }

    const handleAddEvent = (e) => {
        e.preventDefault();
        const until = eventData.isRecurring ? convertToUTC(eventData.endDate) : null;
        const fip = formatdate(eventData.start);
        const dip = formatdate(eventData.end);
        const rule = eventData.isRecurring ? generateRecurrenceRule(eventData.isRecurring, eventData.recurringDays, until) : null;
        const room_gp = rooms.find(room => room._id === eventData.roomName);

        const eventDataToSubmit = {
            ...eventData,
            endDate: until,
            start: fip,
            end: dip,
            rrule: rule,
            room: room_gp.RoomName
        };

        // Set the endDate and recurringDays to null if isRecurring is false
        if (!eventData.isRecurring) {
            eventDataToSubmit.endDate = null;
            eventDataToSubmit.recurringDays = null;
            eventDataToSubmit.rrule = null;
        }

        console.log(eventDataToSubmit);
        dispatch(blockroom(eventDataToSubmit));
    };

  return (
    <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">

            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
                    Hold the Room
                </h4>

                <div className="mb-4">
                        <label htmlFor="roomName" className="block text-sm font-medium text-navy-700">
                            Room Name:
                        </label>
                        <div className="mt-1 space-y-2">
                            {rooms.map((room) => (
                                <label key={room._id} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`roomName_${room._id}`}
                                        name="roomName"
                                        value={room._id}
                                        checked={eventData.roomName === room._id}
                                        onChange={handleInputChange}
                                        className="rounded-full text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                    />
                                    <span className="ml-2 text-sm text-navy-700">{room?.RoomName}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="start" className="block text-sm font-medium text-navy-700">
                            Start Date & Time:
                        </label>
                        <input
                            type="datetime-local"
                            id="start"
                            name="start"
                            value={eventData.start}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="end" className="block text-sm font-medium text-navy-700">
                            End Date & Time:
                        </label>
                        <input
                            type="datetime-local"
                            id="end"
                            name="end"
                            value={eventData.end}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-navy-700">
                            <input
                                type="checkbox"
                                name="isRecurring"
                                checked={eventData.isRecurring}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Recurring Event
                        </label>
                    </div>
                    {eventData.isRecurring && (
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-navy-700">
                                End Date (UTC):
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={eventData.endDate}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                            <label htmlFor="recurringDays" className="block text-sm font-medium text-navy-700">
                                Recurring Days:
                            </label>
                            <select
                                multiple
                                id="recurringDays"
                                name="recurringDays"
                                value={eventData.recurringDays}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-lg border border-navy-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            >
                                <option value="MO">Monday</option>
                                <option value="TU">Tuesday</option>
                                <option value="WE">Wednesday</option>
                                <option value="TH">Thursday</option>
                                <option value="FR">Friday</option>
                                <option value="SA">Saturday</option>
                                <option value="SU">Sunday</option>
                            </select>
                        </div>
                    )}
                    <button
                        type="submit"
                        onClick={handleAddEvent}
                        className="mt-4 px-4 py-2 text-white bg-[#422AFB] rounded-lg hover:bg-[#3311DB] active:bg-[#2111A5] focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:ring-offset-2 focus:outline-none"
                    >
                        Add Event
                    </button>
                

            </div>
        </div>
  )
}

export default MainHold
