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
import PendingOne from "./components/Requests/PendingOne";
import { MdHomeWork } from "react-icons/md";
import Halls from "./components/Halls/Halls";


const routesone = [
    {
        name: "Scheduler",
        layout: "/adminOne",
        path: "scheduler",
        icon: <AiFillSchedule className="h-6 w-6"/>,
        component: <MainScheduler />,
    },
    {
        name: "Calender",
        layout: "/adminOne",
        path: "calender",
        icon: <FaCalendarDay className="h-6 w-6" />,
        component: <MainCalender />,
        secondary: true,
    },
    {
        name: "Users Data",
        layout: "/adminOne",
        icon: <FaUsers className="h-6 w-6" />,
        path: "usersdata",
        component: <Userdata />,
    },
    {
        name: "Profile",
        layout: "/adminOne",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: "Requests",
        layout: "/adminOne",
        path: "requests",
        icon: <RiGitPullRequestLine className="h-6 w-6" />,
        component: <RequestsOne />,
    },
    {
        name: "Pending",
        layout: "/adminOne",
        path: "pending",
        icon: <MdOutlinePendingActions className="h-6 w-6" />,
        component: <PendingOne />,
    },
    {
        name: "Halls",
        layout: "/adminOne",
        path: "halls",
        icon: <MdHomeWork className="h-6 w-6" />,
        component: <Halls />,
    },
];
export default routesone;
