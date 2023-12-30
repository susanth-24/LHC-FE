import NotFound from "./components/NotFound/NotFound";
import React from "react";
// Icon Imports
import {
    MdHome,
    MdOutlineShoppingCart,
    MdBarChart,
    MdPerson,
    MdLock,
    MdOutlinePendingActions,
} from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import MainScheduler from "./components/Scheduler/MainScheduler";
import { FaCalendarDay } from "react-icons/fa";
import MainCalender from "./components/Calender/MainCalender";
import { FaUsers } from "react-icons/fa6";
import Userdata from "./components/UserData/Userdata";
import Profile from "./components/Profile/Profile";
import { RiGitPullRequestLine } from "react-icons/ri";
import RequestsOne from "./components/Requests/RequestsOne";
import Requests from "./components/Requests/Requests";
import Pending from "./components/Requests/Pending";
import PendingTwo from "./components/Requests/PendingTwo";
import { MdHomeWork } from "react-icons/md";
import Halls from "./components/Halls/Halls";


const routesthree = [
    {
        name: "Scheduler",
        layout: "/executive",
        path: "scheduler",
        icon: <AiFillSchedule className="h-6 w-6"/>,
        component: <MainScheduler />,
    },
    {
        name: "Calender",
        layout: "/executive",
        path: "calender",
        icon: <FaCalendarDay className="h-6 w-6" />,
        component: <MainCalender />,
        secondary: true,
    },
    {
        name: "Profile",
        layout: "/executive",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: "Requests",
        layout: "/executive",
        path: "requests",
        icon: <RiGitPullRequestLine className="h-6 w-6" />,
        component: <Requests />,
    },
    {
        name: "Approved",
        layout: "/executive",
        path: "approved",
        icon: <MdOutlinePendingActions className="h-6 w-6" />,
        component: <PendingTwo />,
    },
    {
        name: "Halls",
        layout: "/executive",
        path: "halls",
        icon: <MdHomeWork className="h-6 w-6" />,
        component: <Halls />,
    },
];
export default routesthree;
