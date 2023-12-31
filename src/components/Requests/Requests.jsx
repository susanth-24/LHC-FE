import React, { useState, useEffect, useMemo } from 'react'
import { useTable, usePagination } from 'react-table';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../actions/auth';
import { Link } from 'react-router-dom';
import { getRequests, acceptRequest_1, rejectRequest_1, withdrawRequest, acceptRequest_2, rejectRequest_2, acceptRequest_3, rejectRequest_3 } from '../../actions/requests';
import { approveAvail_1, rejectAvail_1, approveAvail_2, rejectAvail_2, withdrawAvail, approveAvail_3, rejectAvail_3 } from '../../actions/rooms';

function toDate(date) {
    const dateTime = new Date(date);

    const year = dateTime.getUTCFullYear();
    const month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = dateTime.getUTCDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

const Requests = () => {
    const userdata = useSelector(state => state.authReducer.userData);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const id = user?.result?._id
    const requests = useSelector(state => state.requests.requests);
    const [selectedOption, setSelectedOption] = useState('');
    console.log(selectedOption)
    let re


    useEffect(() => {
        dispatch(userProfile(id));
    }, [id]);

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);

    if (userdata._id !== id) {
        Object.keys(userdata).forEach((key) => {
            userdata[key] = null;
        });
    }
    useEffect(() => {
        dispatch(getRequests());
    }, []);
    console.log(requests)
    const [isButtonAcClicked, setIsButtonAcClicked] = useState({});
    const [isButtonREClicked, setIsButtonREClicked] = useState({});



    const [comment, setComment] = useState('');
    const [reasonReg, setreasonReg] = useState(false);
    const requests_admin = requests.map(({ name, date, RoomName, startTime, requestStatus_1, _id, createdAt,attended }) => ({
        name,
        date,
        RoomName,
        startTime,
        requestStatus_1,
        _id,
        createdAt,
        attended
    }));
    const [loading, setLoading] = useState(true);
    const real_req = requests_admin?.slice(0, 20)
    const [ShowAll, setShowAll] = useState(false);

    const filteredRequests = requests?.filter(request => request?.requestedBy === user?.result?._id);
    const handleRadioChange = () => {
        setShowAll((prevShowAll) => !prevShowAll);
    };
    return (
        <div className="!z-5 mt-8 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full pb-10 p-4 h-full">
            <header className="relative flex items-center justify-between">
                <div className="text-xl font-bold text-navy-700 ">
                    Overall Requests
                </div>
                {!ShowAll && (
                    <div className="text-s text-navy-700 ">
                        Showing upto 20 Requests
                    </div>
                )}
                <div className="mt-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-radio h-5 w-5 text-navy-700"
                            checked={ShowAll}
                            onChange={handleRadioChange}
                        />
                        <span className="ml-2 text-navy-900">Show All</span>
                    </label>
                </div>
            </header>

            {(userdata?.post === "Admin" && userdata?._id === user?.result?._id && user?.result) && (

                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <thead class="text-xs text-navy-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    NAME
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    RoomName
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Booking Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    startTime
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    requestStatus
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    attended
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {ShowAll ? (
                                requests_admin?.map((row, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.RoomName}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {toDate(row.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.date}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.startTime}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.requestStatus_1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.attended ? 'Yes' : 'No'}
                                        </td>
                                        <Link to={`/request/admin/${row._id}`}>
                                            <td className="px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap">
                                                Edit
                                            </td>
                                        </Link>

                                    </tr>
                                ))
                            ) : (
                                real_req?.map((row, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.RoomName}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {toDate(row.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.date}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.startTime}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.requestStatus_1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.attended ? 'Yes' : 'No'}
                                        </td>
                                        <Link to={`/request/admin/${row._id}`}>
                                            <td className="px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap">
                                                Edit
                                            </td>
                                        </Link>

                                    </tr>
                                ))
                            )}






                        </tbody>
                    </table>
                </div>
            )}
            {(user?.result?.post === "Executive" && userdata?._id === user?.result?._id && user?.result) && (

                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <thead class="text-xs text-navy-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    NAME
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    RoomName
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Booking Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    startTime
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    requestStatus
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    attended
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {ShowAll ? (
                                filteredRequests?.map((row, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.RoomName}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {toDate(row.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.date}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.startTime}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.requestStatus_1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.attended ? 'Yes' : 'No'}
                                        </td>
                                        <Link to={`/request/executive/${row._id}`}>
                                            <td className="px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap">
                                                Edit
                                            </td>
                                        </Link>

                                    </tr>
                                ))
                            ) : (
                                filteredRequests?.slice(0, 20)?.map((row, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.RoomName}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {toDate(row.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.date}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.startTime}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.requestStatus_1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {row.attended ? 'Yes' : 'No'}
                                        </td>
                                        <Link to={`/request/executive/${row._id}`}>
                                            <td className="px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap">
                                                Edit
                                            </td>
                                        </Link>

                                    </tr>
                                ))
                            )}






                        </tbody>
                    </table>
                </div>
            )}



        </div>
    )
}

export default Requests
