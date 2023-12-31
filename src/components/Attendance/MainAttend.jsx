import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { attend, getRequest } from '../../actions/requests';
import { getRoom } from '../../actions/rooms';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
import Success from './Success';

function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (angle) => (angle * Math.PI) / 180;

    const R = 6371000;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

function isWithinDistance(coord1, lat2, lon2, distanceThreshold) {
    console.log(coord1)
    const [lat1, lon1] = coord1?.split(',')?.map((str) => parseFloat(str?.trim()));

    const distance = haversineDistance(lat1, lon1, lat2, lon2);
    return distance <= distanceThreshold;
}

function isCurrentTimeInRange(startTime, endTime, targetDate) {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

    const startTimeUTC = new Date(`${currentDate}T${startTime}Z`);
    const endTimeUTC = new Date(`${currentDate}T${endTime}Z`);
    const targetDateUTC = new Date(`${targetDate}T00:00:00Z`);

    return (
        now >= startTimeUTC &&
        now <= endTimeUTC &&
        now.toISOString().split('T')[0] === targetDateUTC.toISOString().split('T')[0]
    );
}
const MainAttend = () => {
    const [position, setPosition] = useState({ latitude: null, longitude: null });

    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getRequest(id));
    }, [id]);

    const request = useSelector(state => state.requests.request);
    console.log(request)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        dispatch(getRoom(request?.RoomId));
    }, [request?.RoomId])
    const { room, isLoading } = useSelector((state) => state.rooms);
    console.log(room)
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("please provide location permission")
        }
    }, []);
    let res, check;
    if (room) {
        const res = isWithinDistance(room?.Location, position?.latitude, position?.longitude, 50)
        console.log(res)
    }
    if (request) {
        const check = isCurrentTimeInRange(request?.startTime, request?.endTime, request?.date);
        console.log(check)
    }
    const abled = res && check;
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        navigate('/')
    };
    const handleCloseModal = () => {
        setShowErrorModal(false);
        navigate('/')
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (abled) {
            dispatch(attend(request?._id));
            setShowModal(true);
        } else {
            setShowErrorModal(true);
        }
    };

    return (
        <div className="mt-10 mb-10 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">

            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
                    LHBP IIT Ropar
                </h4>
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
                    Confirm Session Is In Place
                </h4>
                {request?.attended ? (
                    <>
                        <p className="mb-9 ml-1 text-base text-gray-600">
                            The attendance has been recorded for this request!
                        </p>

                    </>
                ):(
                    position?.latitude ? (
                        <>
                            <p className="mb-9 ml-1 text-base text-gray-600">
                                You have to reach {room?.Location} at {request?.startTime} - {request?.date} you are at {position?.latitude}, {position?.longitude}.
                            </p>
    
    
    
    
    
                            <button type="submit" disabled={abled} onClick={handleSubmit} className="linear mt-2 w-full rounded-xl bg-[#422AFB] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[#3311DB] active:bg-[#2111A5] ">
                                {abled ? (
                                    <h1>
                                        Confirm Attendance</h1>
                                ) : (<h1>
                                    Not Permitted</h1>)}
                            </button></>
    
                    ) : (
                        <>
                            <p className="mb-9 ml-1 text-base text-gray-600">
                                Please give Location access or your browser is not supporting this action!
                            </p>
                        </>
                    )
                )}


                {showErrorModal && (
                    <Error isOpen={showErrorModal} message="Your attendance can't be processed, please try again, if the issue persists please inform Admin!" onClose={handleCloseErrorModal} />
                )}
                {showModal && (
                    <Success isOpen={showModal} message="Your attendance has been confirmed, and has been recorded!" onClose={handleCloseModal} />
                )}
            </div>
        </div>
    )
}

export default MainAttend
