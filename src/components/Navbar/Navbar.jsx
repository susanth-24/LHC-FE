import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import * as actionType from "../../constants/actionTypes";
import { useDispatch, useSelector } from 'react-redux';
//import decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import Dropdown from '../Dropdown/Dropdown';
import { FaUserCircle } from 'react-icons/fa';
import { BsArrowBarUp } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { IoMdNotificationsOutline, IoMdInformationCircleOutline } from 'react-icons/io';
import { FiAlignJustify } from 'react-icons/fi';
import { CiLogout } from "react-icons/ci";
import { clearNotify, fetchNotify } from '../../actions/auth';
import moment from 'moment';
import { RiGitPullRequestFill } from "react-icons/ri";

const Navbar = (props) => {
    const { onOpenSidenav, brandText } = props;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user)
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const realUser = JSON.parse(localStorage.getItem('profile'));
    const [toggle, setToggle] = useState(false);

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/');

        setUser(null);
        window.location.reload();
    }
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);
    useEffect(() => {
        dispatch(fetchNotify(user?.result?._id));
    }, []);
    const handleClear = () => {
        dispatch(clearNotify(user?.result?._id))
    }
    const Notifications = useSelector((state) => state.authReducer.notifications) || [];
    const reversedNotifications = [...Notifications]?.reverse();
    const firstSixNotifications = reversedNotifications.slice(0, 6);

    return (
        <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl ">
            <div className="ml-[6px]">
                <p className="shrink text-[33px] capitalize text-[#1B254B]">
                    <h1 className="font-bold capitalize hover:text-[#1B254B]">{brandText}</h1>
                </p>
            </div>

            <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
                <div className="flex h-full items-center justify-center rounded-full bg-[#F4F7FE] text-[#1B254B] xl:w-[225px]">
                    <p className="text-navy-700 font-bold text-xl">
                        Welcome
                    </p>
                </div>
                <span
                    className="flex cursor-pointer text-xl text-gray-600  xl:hidden"
                    onClick={onOpenSidenav}
                >
                    <FiAlignJustify className="h-5 w-5" />
                </span>
                {/* start Notification */}
                <Dropdown
                    button={
                        <p className="cursor-pointer">
                            <IoMdNotificationsOutline className="h-5 w-5 text-gray-600 " />
                        </p>
                    }
                    animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                    children={
                        <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500  sm:w-[460px]">
                            <div className="flex items-center justify-between">
                                <p className="text-base font-bold text-navy-700 ">Notification</p>
                                <button onClick={handleClear} className="text-sm  text-navy-700  font-bold">
                                Mark all read
                        </button>
                      
                            </div>
                            {firstSixNotifications?.length > 0 ? (
                                firstSixNotifications?.map((notification, index) => (
                                    <div key={index} className="flex w-full items-center">
<RiGitPullRequestFill className="h-5 w-5 mb-1"/>
                                        <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                                            <p className="mb-1 text-left text-base font-bold text-gray-900">
                                            {notification.message}   
                                                                 </p>
                                                                 <span className="font-base text-left text-xs text-gray-900"></span>{' '}
                                            {moment(notification.createdAt).fromNow()} 
                                            
                                        </div>
                                    </div>
                                ))) : (
                                <p className="text-navy-700 text-sm mx-2 text-center">No notifications</p>
                            )}



                        </div>
                    }
                    classNames="py-2 top-4 -left-[230px] md:-left-[440px] w-max"
                />
                {/* start Horizon PRO */}


                {/* Profile & Dropdown */}
                <Dropdown
                    button={<FaUserCircle className="h-7 w-7" />}
                    children={
                        <div className="flex w-56 flex-col justify-start rounded-[20px] bg-gradient-to-tr from-[#ffdeec] to-[#d6d2fe] ">
                            <div className="p-4">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-navy-700">👋 Hey, {user?.result?.name}</p>{' '}
                                </div>
                            </div>
                            <div className="h-px w-full bg-gray-200" />
                            {user?.result ? (
                                <div className="flex flex-col p-4">
                                    <button type="button" onClick={logout} className="mt-1 text-sm font-medium text-red-500 hover:text-red-500 flex items-center">
                                        <CiLogout className="mr-1" />
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col p-4">
                                    <a href=" " className="mt-1 text-sm font-medium text-red-500 hover:text-red-500 flex items-center">
                                        <CiLogout className="mr-1" />
                                        How are you here
                                    </a>
                                </div>
                            )}


                        </div>
                    }
                    classNames="py-2 top-8 -left-[180px] w-max"
                />
            </div>
        </nav>
    );
};

export default Navbar;
