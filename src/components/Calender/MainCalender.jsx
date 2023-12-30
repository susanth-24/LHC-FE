import React, { useState, useEffect } from 'react';
import DemoApp from './Calender'
import Navbar from '../Navbar/Navbar'
import { Tooltip } from "bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getRequests } from '../../actions/requests'
import Footer from '../Footer/Footer';

import { MdError } from "react-icons/md";

function convertRequestsToEvents(requests) {
    return requests?.map((request, index) => {
        let color;
        let description;

        if (request.requestStatus_1 === 'Approved' && request.requestStatus_2 === 'Approved' && request.requestStatus_3 === 'Approved') {
            color = 'green';
            description = `Club ${request.name} has Booked ${request.RoomName} for Session: ${request.sessionName} (Approved)`;
        } else if (request.requestStatus_1 === 'Pending' || request.requestStatus_2 === 'Pending' || request.requestStatus_3 === 'Pending') {
            color = 'blue';
            description = `Club ${request.name} has Requested to Book ${request.RoomName} for Session: ${request.sessionName} (Pending)`;
        } else if (request.requestStatus_1 === 'Declined' || request.requestStatus_2 === 'Declined' || request.requestStatus_3 === 'Declined') {
            color = 'red';
            description = `Booking Request by Club ${request.name} for ${request.RoomName} (Declined)`;
        } else if (request.requestStatus_1 === 'Withdrawed') {
            color = 'brown';
            description = `Booking has been withdrawd by Club ${request.name} for ${request.RoomName} (Withdrawed)`;
        } else {
            color = 'gray';
            description = `Club ${request.name} has Booked ${request.RoomName} for Session: ${request.sessionName}`;
        }

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

const MainCalender = () => {
    const [isSmallDevice, setIsSmallDevice] = useState(false);

    useEffect(() => {
        checkWindowWidth();
        window.addEventListener('resize', checkWindowWidth);

        return () => {
            window.removeEventListener('resize', checkWindowWidth);
        };
    }, []);

    const checkWindowWidth = () => {
        const { innerWidth } = window;
        setIsSmallDevice(innerWidth < 700);
    };

    const dispatch = useDispatch();
    const requests = useSelector(state => state.requests.requests);
    useEffect(() => {
        dispatch(getRequests());
    }, []);
    const INITIAL_EVENTS = convertRequestsToEvents(requests);

    return (
        <>

            {!isSmallDevice ?
                <>
                    <div className="min-h-screen justify-center bg-[#ebf8ff]">

                        <DemoApp events={INITIAL_EVENTS} />
                    </div>
                </>
                : <>
                    <div class="max-w-sm mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow ">
                      <MdError className="h-8 w-8 fill-brand-500"/>

                        <a href="#">
                            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">Device Compatibility Warning</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-500 ">This content cannot be displayed on small devices. Please
                         use a desktop or tablet for a better experience.</p>
                        
                    </div>
                </>}

        </>
    )
}

export default MainCalender
