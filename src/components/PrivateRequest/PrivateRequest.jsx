import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCodePullRequest } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { userProfile } from '../../actions/auth';
import { getRequest, getRequests, acceptRequest_1, rejectRequest_1, withdrawRequest, acceptRequest_2, rejectRequest_2, acceptRequest_3, rejectRequest_3 } from '../../actions/requests';
import { approveAvail_1, rejectAvail_1, approveAvail_2, rejectAvail_2, withdrawAvail, approveAvail_3, rejectAvail_3 } from '../../actions/rooms';

const PrivateRequest = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getRequest(id));
  }, [id]);
  const row = useSelector(state => state.requests.request);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  let route = "/";
  if (user?.result?.post === 'Admin') {
    route = "/admin/scheduler";
  } else if (user?.result?.post === 'Admin_1') {
    route = "/adminOne/scheduler";
  } else if (user?.result?.post === 'Admin_2') {
    route = "/adminTwo/scheduler";
  } else if (user?.result?.post === 'Executive') {
    route = "/executive/scheduler";
  }
  const [isButtonAcClicked, setIsButtonAcClicked] = useState({});
  const [comment, setComment] = useState('');
  console.log(row)
  const [reasonReg, setreasonReg] = useState(false);
  const userCategory = user?.result?.category;
  const rowCategory = row?.category;

  const areWordsEqual = userCategory && rowCategory
    ? userCategory.split('_')[1] === rowCategory
    : false;
  return (
    <div className="bg-white min-h-screen">



      <div className="relative isolate px-6 pt-14 lg:px-8">

        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-6">
          <Link to={route} className="mt-0 absolute top-0 left-0 p-6 w-max lg:pt-10">

            <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                  fill="#A3AED0"
                />
              </svg>
              <button className="ml-3 text-sm text-gray-800">
                Back
              </button>
            </div>
          </Link>
          {(user?.result?.post === "Admin" && user?.result) && (
            <>
              <div>
                <div className="!z-5  relative rounded-x bg-white bg-clip-border shadow-2xl   w-full h-full p-[16px] bg-cover">
                  <div className="">

                    <div class="p-6">
                      <FaCodePullRequest className='h-6 w-6' />
                      <h5 class="block mb-2 font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                        Review Request
                      </h5>
                      <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 md:w-1/2">
                          <label className="font-semibold text-sm text-black pb-1 block">Requested By: <span className="text-gray-900 font-medium">{row?.name}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Requested For: <span className="text-gray-900 font-medium">{row?.RoomName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Session Name: <span className="text-gray-900 font-medium">{row?.sessionName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Expected Members: <span className="text-gray-900 font-medium">{row?.ExpectedMembers}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.createdAt).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.date).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Start Time : <span className="text-gray-900 font-medium">{row?.startTime}</span></label>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3">
                          <label className="font-semibold text-sm text-black pb-1 block">End Time: <span className="text-gray-900 font-medium">{row?.endTime}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Reason : <span className="text-gray-900 font-medium">{row?.reason}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Remarks : <span className="text-gray-900 font-medium">{row?.remarks}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Admin Status : <span className="text-gray-900 font-medium">{row?.requestStatus_1}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">FA {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_2}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">GS {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_3}</span></label>
                        </div>

                      </div>
                    </div>

                    {isButtonAcClicked[row?._id] ? (null) : (
                      row?.requestStatus_1 === "Pending" && row?.requestStatus_2 === "Approved" && row?.requestStatus_3 === "Approved" ? (<div className='flex flex-wrap justify-end gap-3 mt-5'>
                        <button onClick={() => {

                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });

                          dispatch(acceptRequest_1(row))
                            .then((response) => {
                              if (response.success) {
                                //row.requestStatus_1 = "Accepted";
                                dispatch(approveAvail_1(row?.RoomId, row?.UID));
                              } else {
                                null//add a pop up here

                              }
                            })
                            .catch((error) => {
                              null//add a pop up here
                            });
                        }}
                          disabled={isButtonAcClicked[row?._id]}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                          <span class="inline-block mr-2">Approve</span>

                        </button>
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });
                          setreasonReg(true)
                        }} class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        >
                          <span class="inline-block mr-2">Decline</span>

                        </button>
                      </div>) : (<label class="font-semibold text-sm text-black pb-1 block"> {null}</label>))}
                    {reasonReg && isButtonAcClicked[row?._id] && <div>
                      <label className="font-semibold text-sm text-black pb-1 block">Reason For Rejection:</label>
                      <textarea
                        className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex flex-wrap justify-center gap-3 mt-5">
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });
                          setreasonReg(false);
                          dispatch(rejectRequest_1(row, comment + " " + 'by' + " " + user?.result?.name));
                          dispatch(rejectAvail_1(row?.RoomId, row?.UID))

                        }}
                          //disabled={isButtonAcClicked[row?._id]}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                          <span class="inline-block mr-2">Confirm</span>

                        </button>
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: false });
                          setreasonReg(false);
                        }} class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">

                          <span class="inline-block mr-2">Cancel</span>

                        </button>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            </>
          )}
          {(user?.result?.post === "Admin_1" && areWordsEqual && user?.result) && (
            <>
              <div>
                <div className="!z-5  relative rounded-x bg-white bg-clip-border shadow-2xl   w-full h-full p-[16px] bg-cover">
                  <div className="">

                    <div class="p-6">
                      <FaCodePullRequest className='h-6 w-6' />
                      <h5 class="block mb-2 font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                        Review Request
                      </h5>
                      <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 md:w-1/2">
                          <label className="font-semibold text-sm text-black pb-1 block">Requested By: <span className="text-gray-900 font-medium">{row?.name}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Requested For: <span className="text-gray-900 font-medium">{row?.RoomName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Session Name: <span className="text-gray-900 font-medium">{row?.sessionName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Expected Members: <span className="text-gray-900 font-medium">{row?.ExpectedMembers}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.createdAt).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.date).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Start Time : <span className="text-gray-900 font-medium">{row?.startTime}</span></label>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3">
                          <label className="font-semibold text-sm text-black pb-1 block">End Time: <span className="text-gray-900 font-medium">{row?.endTime}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Reason : <span className="text-gray-900 font-medium">{row?.reason}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Remarks : <span className="text-gray-900 font-medium">{row?.remarks}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Admin Status : <span className="text-gray-900 font-medium">{row?.requestStatus_1}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">FA {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_2}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">GS {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_3}</span></label>
                        </div>

                      </div>
                    </div>

                    {isButtonAcClicked[row?._id] ? (null) : (
                      row?.requestStatus_2 === "Pending" && row?.requestStatus_3 === "Approved" ? (<div className='flex flex-wrap justify-end gap-3 mt-5' >
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });

                          dispatch(acceptRequest_2(row))
                          dispatch(approveAvail_2(row?.RoomId, row?.UID))
                        }}
                          disabled={isButtonAcClicked[row?._id]}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                          <span class="inline-block mr-2">Approve</span>

                        </button>
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });

                          setreasonReg(true)
                        }} class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">

                          <span class="inline-block mr-2">Decline</span>

                        </button>
                      </div>) : (<label class="font-semibold text-sm text-black pb-1 block"> {row.requestStatus}</label>))}
                    {reasonReg && isButtonAcClicked[row?._id] && <div>
                      <label className="font-semibold text-sm text-black pb-1 block">Reason For Rejection:</label>
                      <textarea
                        className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex flex-wrap justify-center gap-3 mt-5">
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });
                          setreasonReg(false);
                          dispatch(rejectRequest_2(row, comment + " " + 'by' + " " + user?.result?.name));
                          dispatch(rejectAvail_2(row?.RoomId, row?.UID))

                        }}
                          //disabled={isButtonAcClicked[row?._id]}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                          <span class="inline-block mr-2">Confirm</span>

                        </button>
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: false });
                          setreasonReg(false);
                        }} class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">

                          <span class="inline-block mr-2">Cancel</span>

                        </button>
                      </div>
                    </div>}

                  </div>
                </div>
              </div>
            </>
          )}
          {(user?.result?.post === "Admin_2" && areWordsEqual && user?.result) && (
            <>
              <div>
                <div className="!z-5  relative rounded-x bg-white bg-clip-border shadow-2xl   w-full h-full p-[16px] bg-cover">
                  <div className="">

                    <div class="p-6">
                      <FaCodePullRequest className='h-6 w-6' />
                      <h5 class="block mb-2 font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                        Review Request
                      </h5>
                      <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 md:w-1/2">
                          <label className="font-semibold text-sm text-black pb-1 block">Requested By: <span className="text-gray-900 font-medium">{row?.name}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Requested For: <span className="text-gray-900 font-medium">{row?.RoomName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Session Name: <span className="text-gray-900 font-medium">{row?.sessionName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Expected Members: <span className="text-gray-900 font-medium">{row?.ExpectedMembers}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.createdAt).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.date).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Start Time : <span className="text-gray-900 font-medium">{row?.startTime}</span></label>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3">
                          <label className="font-semibold text-sm text-black pb-1 block">End Time: <span className="text-gray-900 font-medium">{row?.endTime}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Reason : <span className="text-gray-900 font-medium">{row?.reason}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Remarks : <span className="text-gray-900 font-medium">{row?.remarks}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Admin Status : <span className="text-gray-900 font-medium">{row?.requestStatus_1}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">FA {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_2}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">GS {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_3}</span></label>
                        </div>

                      </div>
                    </div>

                    {isButtonAcClicked[row?._id] ? (null) : (
                      row?.requestStatus_3 === "Pending" ? (<div className='flex flex-wrap justify-end gap-3 mt-5' >
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });

                          dispatch(acceptRequest_3(row))
                          dispatch(approveAvail_3(row?.RoomId, row?.UID))
                        }}
                          disabled={isButtonAcClicked[row?._id]}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">                          <span class="inline-block mr-2">Approve</span>

                        </button>
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });
                          setreasonReg(true)
                        }}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">                          <span class="inline-block mr-2">Decline</span>

                        </button>
                      </div>) : (<label class="font-semibold text-sm text-black pb-1 block"> {row.requestStatus}</label>))}
                    {reasonReg && isButtonAcClicked[row?._id] && <div>
                      <label className="font-semibold text-sm text-black pb-1 block">Reason For Rejection:</label>
                      <textarea
                        className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex flex-wrap justify-center gap-3 mt-5">
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });
                          setreasonReg(false);
                          dispatch(rejectRequest_3(row, comment + " " + 'by' + " " + user?.result?.name));
                          dispatch(rejectAvail_3(row?.RoomId, row?.UID))

                        }}
                          //disabled={isButtonAcClicked[row?._id]}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">                          <span class="inline-block mr-2">Confirm</span>

                        </button>
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: false });
                          setreasonReg(false);
                        }}
                          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">                          <span class="inline-block mr-2">Cancel</span>

                        </button>
                      </div>
                    </div>}

                  </div>
                </div>
              </div>
            </>
          )}
          {(user?.result?.post === "Executive" && user?.result?._id === row?.requestedBy && user?.result) && (
            <>
              <div>
                <div className="!z-5  relative rounded-x bg-white bg-clip-border shadow-2xl   w-full h-full p-[16px] bg-cover">
                  <div className="">

                    <div class="p-6">
                      <FaCodePullRequest className='h-6 w-6' />
                      <h5 class="block mb-2 font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                        Your Request Details
                      </h5>
                      <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 md:w-1/2">
                          <label className="font-semibold text-sm text-black pb-1 block">Requested By: <span className="text-gray-900 font-medium">{row?.name}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Requested For: <span className="text-gray-900 font-medium">{row?.RoomName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Session Name: <span className="text-gray-900 font-medium">{row?.sessionName}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Expected Members: <span className="text-gray-900 font-medium">{row?.ExpectedMembers}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.createdAt).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Date : <span className="text-gray-900 font-medium">{moment(row?.date).format('DD-MM-YYYY')}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Start Time : <span className="text-gray-900 font-medium">{row?.startTime}</span></label>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3">
                          <label className="font-semibold text-sm text-black pb-1 block">End Time: <span className="text-gray-900 font-medium">{row?.endTime}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Reason : <span className="text-gray-900 font-medium">{row?.reason}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Remarks : <span className="text-gray-900 font-medium">{row?.remarks}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">Admin Status : <span className="text-gray-900 font-medium">{row?.requestStatus_1}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">FA {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_2}</span></label>
                          <label className="font-semibold text-sm text-black pb-1 block">GS {row?.category} Status : <span className="text-gray-900 font-medium">{row?.requestStatus_3}</span></label>
                        </div>

                      </div>
                    </div>
                    <div className='flex flex-wrap justify-end gap-3 mt-5'>
                    {(row?.requestStatus_1 === 'Approved' && row?.requestStatus_2 === 'Approved' && row?.requestStatus_3 === 'Approved') && (
                      <Link to={`/Booked/pdf/${row?._id}`}>
                        <button type="button" class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs 
                        py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                          Download PDF
                          </button>
                      </Link>)}
                    {isButtonAcClicked[row?._id] ? null : (
                      (row?.requestStatus_1 !== 'Declined' || row?.requestStatus_2 !== 'Declined' || row?.requestStatus_3 !== 'Declined') &&
                      (row?.requestStatus_1 !== 'Withdrawed' || row?.requestStatus_2 !== 'Withdrawed' || row?.requestStatus_3 !== 'Withdrawed') && (
                        <button onClick={() => {
                          setIsButtonAcClicked({ ...isButtonAcClicked, [row?._id]: true });
                          dispatch(withdrawRequest(row?._id));
                          dispatch(withdrawAvail(row?.RoomId, row?.UID));
                        }} 
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">                          
                        <span className="inline-block mr-2">Withdraw</span>
                          
                        </button>
                      )
                    )}
                    </div>
                    


                  </div>
                </div>
              </div>
            </>
          )}


        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PrivateRequest
