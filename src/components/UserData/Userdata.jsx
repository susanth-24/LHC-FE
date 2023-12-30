import React, { useEffect, useState } from 'react';
import { allusers } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Userdata = () => {
    const dispatch = useDispatch();
    const alluser = useSelector((state) => state.authReducer.getusers);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() => {
        dispatch(allusers());
    }, [dispatch]);

    let all;

    if (user?.result?.post === 'Admin') {
        all = alluser;
    } else if (user?.result?.post === 'Admin_1') {
        const userCategory = user?.result?.category;
        const lastPart = userCategory?.split('_').pop();
        all = alluser?.filter((user) => user?.category === lastPart);
    } else if (user?.result?.post === 'Admin_2') {
        const userCategory = user?.result?.category;
        const lastPart = userCategory?.split('_').pop();
        all = alluser?.filter((user) => user?.category === lastPart);
    }
    console.log(all)
    return (
        <div className="!z-5 mt-8 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full pb-10 p-4 h-full">
            <header className="relative flex items-center justify-between">
                <div className="text-xl font-bold text-navy-700 ">
                    Users Data
                </div>
            </header>


            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                    <thead class="text-xs text-navy-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                NAME
                            </th>
                            <th scope="col" class="px-6 py-3">
                                POST
                            </th>
                            <th scope="col" class="px-6 py-3">
                                CATEGORY
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Entry NUMBER
                            </th>
                            <th scope="col" class="px-6 py-3">
                                PHONE NUMBER
                            </th>
                            <th scope="col" class="px-6 py-3">
                                EMAIL
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {all?.map((group, index) => (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {group?.name}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {group?.post}
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {group?.category}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {group?.entryNumber}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {group?.mobileNumber}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {group?.email}
                                </td>
                            </tr>
                        ))}


                        
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Userdata
