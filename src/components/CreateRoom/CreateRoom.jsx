import React, { useState, useEffect } from 'react'
import addRoom from '../../assets/addRoom.jpg';
import { Link } from 'react-router-dom';
import MainCreate from './MainCreate';

const CreateRoom = () => {
    const [currentId, setCurrentId] = useState(0);

    // const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(user)
    // let route = "/";
    // if (user?.result?.post === 'Admin') {
    //     route = "/admin/profile";
    // } else if (user?.result?.post === 'Admin_1') {
    //     route = "/adminOne/profile";
    // } else if (user?.result?.post === 'Admin_2') {
    //     route = "/adminTwo/profile";
    // } else if (user?.result?.post === 'Executive') {
    //     route = "/executive/profile";
    // }

    return (
        <>
            <div className=" bg-white border-spacing-2 pb-2 mt-3 w-full float-right  h-full">
                <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 ">
                <div className="px-4 ">
                    <MainCreate currentId={currentId} setCurrentId={setCurrentId} />
                </div>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[36vw] 2xl:w-[44vw]">
                    <div
                        className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                        style={{ backgroundImage: `url(${addRoom})` }}
                    />
                </div>
                </div>
            </div>
        </>
    )
}

export default CreateRoom
