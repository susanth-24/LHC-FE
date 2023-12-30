import React from 'react'
// Icon Imports
import {
    MdHome,
    MdOutlineShoppingCart,
    MdBarChart,
    MdPerson,
    MdLock,
} from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import MainScheduler from "./components/Scheduler/MainScheduler";
import { FaCalendarDay } from "react-icons/fa";
import MainCalender from "./components/Calender/MainCalender";
import { FaUsers } from "react-icons/fa6";
import Userdata from "./components/UserData/Userdata";
import Profile from "./components/Profile/Profile";
import { MdLibraryAdd } from "react-icons/md";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import CreateAgent from "./components/CreateAgent/CreateAgent";
import { IoMdCreate } from "react-icons/io";
import HoldRoom from "./components/HoldRoom/HoldRoom";
import { AiFillStop } from "react-icons/ai";
import Requests from "./components/Requests/Requests";
import { RiGitPullRequestLine } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import Pending from './components/Requests/Pending';
import { MdHomeWork } from "react-icons/md";
import Halls from './components/Halls/Halls';


const routes = [
    {
        name: "Scheduler",
        layout: "/admin",
        path: "scheduler",
        icon: <AiFillSchedule className="h-6 w-6"/>,
        component: <MainScheduler />,
    },
    {
        name: "Calender",
        layout: "/admin",
        path: "calender",
        icon: <FaCalendarDay className="h-6 w-6" />,
        component: <MainCalender />,
        secondary: true,
    },
    {
        name: "Users Data",
        layout: "/admin",
        icon: <FaUsers className="h-6 w-6" />,
        path: "usersdata",
        component: <Userdata />,
    },
    {
        name: "Profile",
        layout: "/admin",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: "Create Room",
        layout: "/admin",
        path: "createroom",
        icon: <MdLibraryAdd className="h-6 w-6" />,
        component: <CreateRoom />,
    },
    {
        name: "Create Executive",
        layout: "/admin",
        path: "createagent",
        icon: <IoMdCreate className="h-6 w-6" />,
        component: <CreateAgent />,
    },
    {
        name: "Create Hold",
        layout: "/admin",
        path: "createhold",
        icon: <AiFillStop className="h-6 w-6" />,
        component: <HoldRoom />,
    },
    {
        name: "Requests",
        layout: "/admin",
        path: "requests",
        icon: <RiGitPullRequestLine className="h-6 w-6" />,
        component: <Requests />,
    },
    {
        name: "Pending",
        layout: "/admin",
        path: "pending",
        icon: <MdOutlinePendingActions className="h-6 w-6" />,
        component: <Pending />,
    },
    {
        name: "Halls",
        layout: "/admin",
        path: "halls",
        icon: <MdHomeWork className="h-6 w-6" />,
        component: <Halls />,
    },
];
export default routes;
