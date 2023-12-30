import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { createRequest, } from '../../actions/requests';
import { updateAvail } from '../../actions/rooms';
import Error from './Error';
import Success from './Success';

const MainBook = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'))
    const posts = useSelector((state) => state.rooms);
    console.log(posts)
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        RoomName: '',
        sessionName: '',
        ExpectedMembers: '',
        startTime: '',
        endTime: '',
        date: '',
        reason: '',
        remarks: '',
    });
    const [AvailData, setAvailData] = useState({
        date: '',
        timeRange: {
            startTime: '',
            endTime: '',
        },
        status: '',
        bookedBy: '',
    });
    const [uidMade, setUidMade] = useState('');

    useEffect(() => {
        setUidMade(new Date().getTime() + (user?.result?.name || ''));
    }, []); useEffect(() => {
        if (posts) {
            setPostData({
                RoomName: posts?.room?.RoomName,
                sessionName: '',
                ExpectedMembers: '',
                startTime: posts.startTime || '',
                endTime: posts.endTime || '',
                date: posts.date || '',
                reason: '',
                remarks: '',
                email: user?.result?.email,
                PhNumber: user?.result?.mobileNumber,
            });
            setAvailData({
                date: posts.date,
                timeRange: {
                    startTime: posts.startTime,
                    endTime: posts.endTime,
                },
                status_1: 'Pending',
                status_2: 'Pending',
                status_3: 'Pending',
                bookedBy: user?.result?._id,
                bookedByName: user?.result?.name,
                UID: uidMade,
            })
        }
    }, [posts]);
    const clear = () => {
        setPostData({
            sessionName: "",
            ExpectedMembers: "",
            reason: "",
            remarks: ""
        });
    };
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
        console.log(posts?.room?.ban)
        if (
            user?.result?.post !== 'Admin' &&
            user?.result?.post !== 'Admin_1' &&
            !posts?.room?.ban &&
            postData &&
            postData.RoomName &&
            postData.sessionName !== '' &&
            postData.ExpectedMembers !== '' &&
            postData.startTime !== '' &&
            postData.endTime !== '' &&
            postData.date !== '' &&
            postData.reason !== '' &&
            postData.remarks !== '' &&
            user?.result?.email &&
            user?.result?.mobileNumber
        ) {
            dispatch(updateAvail(posts?.room?._id, AvailData));

            dispatch(
                createRequest({ ...postData, RoomId: posts?.room?._id, name: user?.result?.name, entryNumber: user?.result?.entryNumber, category: user?.result?.category, UID: uidMade }, navigate)
            );
            clear();
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
                    Confirm Booking
                </h4>

                <div className="mb-10 flex items-center ">
                    <div className="h-px w-full bg-gray-200 " />
                </div>
                <label class="font-semibold text-sm text-navy-700 pb-1 block">Session Name</label>
                <input name="sessionName"
                    required
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={postData.sessionName}
                    placeholder='Enter the details completely'
                    onChange={(e) => setPostData({ ...postData, sessionName: e.target.value })}
                />

                <label class="font-semibold text-sm text-navy-700 pb-1 block">Expected Members</label>
                <input name="ExpectedMembers"
                    required
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={postData.ExpectedMembers}
                    placeholder='Enter the Expected Members'
                    onChange={(e) =>
                        setPostData({ ...postData, ExpectedMembers: e.target.value })
                    } />

                <label class="font-semibold text-sm text-navy-700 pb-1 block">Date</label>
                <input name="date"
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={postData.date}
                    readOnly
                    onChange={(e) =>
                        setPostData({ ...postData, requestTime: e.target.value })
                    } />
                <label class="font-semibold text-sm text-navy-700 pb-1 block">Start Time</label>
                <input name="startTime"
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={postData.startTime}
                    readOnly
                    onChange={(e) =>
                        setPostData({ ...postData, startTime: e.target.value })
                    } />
                <label class="font-semibold text-sm text-navy-700 pb-1 block">End Time</label>
                <input name="endTime"
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={postData.endTime}
                    readOnly
                    onChange={(e) =>
                        setPostData({ ...postData, endTime: e.target.value })
                    } />
                <label class="font-semibold text-sm text-navy-700 pb-1 block">reason</label>
                <input name="reason"
                    required
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={postData.reason}
                    placeholder='Enter your Reason'
                    onChange={(e) =>
                        setPostData({ ...postData, reason: e.target.value })
                    } />
                <label class="font-semibold text-sm text-navy-700 pb-1 block">remarks</label>
                <input name="remarks"
                    required
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={postData.remarks}
                    placeholder='Enter your Remark'
                    onChange={(e) =>
                        setPostData({ ...postData, remarks: e.target.value })
                    } />


                <button onClick={handleSubmit} type="submit" className="linear mt-2 w-full rounded-xl bg-[#422AFB] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[#3311DB] active:bg-[#2111A5] ">
                    Submit
                </button>
                <button onClick={clear} type="submit" className="linear mt-2 w-full rounded-xl bg-[#422AFB] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[#3311DB] active:bg-[#2111A5] ">
                    Clear
                </button>
                {showErrorModal && (
        <Error isOpen={showErrorModal} message="Your request can't be processed, may be the room is blocked!" onClose={handleCloseErrorModal} />
      )}
      {showModal && (
        <Success isOpen={showModal} message="Your request has been submitted, wait for verification" onClose={handleCloseModal} />
      )}
            </div>
        </div>
    )
}

export default MainBook
