import React, { useState, useEffect } from 'react'
import gradient from '../../assets/gradient.jpg';
import { FaHome } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userProfile } from '../../actions/auth';
import { FaEdit } from "react-icons/fa";
import { IoOptions } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { banRoom, getRoom, unbanRoom } from '../../actions/rooms';


const Hall = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    if (!post) {
        // Handle loading state, for example, show a loader
        return <div>Loading...</div>;
    }
    console.log(post)
    return (
        <>
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 items-center w-full h-full p-[16px] bg-cover">

                <div
                    className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                    style={{ backgroundImage: `url(${gradient})` }}
                >
                    <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-white ">
                        <FaHome className="h-10 w-10" />
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center">
                    <h4 className="text-xl font-bold text-navy-700 ">
                        {post?.RoomName}
                    </h4>
                </div>
                <div className="justify-center mb-2 mt-4 flex flex-wrap gap-2 ">
                    <p className="bg-gray-200 px-3 p-4 py-1 rounded-full text-xs font-medium text-gray-800">
                        {post?.description}
                    </p>
                </div>
                <div className="justify-center mb-2 mt-4 flex flex-wrap gap-2 ">
                    <p className="bg-gray-200 px-3 p-4 py-1 rounded-full text-xs font-medium text-gray-800">
                        Remark : {post?.remark}
                    </p>
                </div>

                <div className="grid mt-2 grid-cols-2 gap-4 px-2">

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Capacity</p>
                        <p className="text-base font-medium text-navy-700 ">
                            {post?.Capacity}
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-base font-medium text-navy-700 ">
                            {post?.Location}
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Status</p>
                        {!post?.ban ? (
                            <p className="text-base font-medium text-navy-700 ">
                                Available
                            </p>
                        ) : (
                            <p className="text-base font-medium text-navy-700 ">
                                Not Available
                            </p>
                        )}

                    </div>
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Released</p>
                        <p className="text-base font-medium text-navy-700 ">
                            {moment(post.createdAt).fromNow()}
                        </p>
                    </div>

                </div>
                <div className='gap-6 flex'>
                    {(user?.result.post === "Admin") && (
                        <footer className="relative flex mt-4">
                            <button onClick={() => {
                                //console.log(post._id)
                                setCurrentId(post._id)
                                //navigate(`/profile/${user?.result?._id}`)
                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                                title = "Edit Hall"
                            }}>
                                <FaEdit className="h-6 w-6 fill-[#422AFB] " />
                            </button>
                        </footer>
                    )}
                    {(user?.result.post === "Admin" && user?.result && !post?.ban) && (
                        <footer className="relative flex mt-4">
                            <button onClick={() => dispatch(banRoom(post?._id))} title="Edit Hall">
                                <MdBlock className="h-6 w-6 fill-[#422AFB] " />
                            </button>
                        </footer>
                    )}
                    {(user?.result.post === "Admin" && user?.result && post?.ban) && (
                        <footer className="relative flex mt-4">
                            <button onClick={() => dispatch(unbanRoom(post?._id))} title="Edit Hall">
                                <CgUnblock className="h-6 w-9 fill-[#422AFB] " />
                            </button>
                        </footer>
                    )}

                </div>



            </div>
        </>
    )
}

export default Hall
