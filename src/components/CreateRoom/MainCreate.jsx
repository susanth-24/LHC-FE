import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createRoom, updateRoom } from '../../actions/rooms'


const MainCreate = ({ currentId, setCurrentId }) => {
    const room = useSelector((state) => currentId ? state.rooms.rooms.find((p) => p._id === currentId) : null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'))
    const [postData, setPostData] = useState({
        RoomName: "",
        description: "",
        Capacity: "",
        Location: "",
        remark: "",
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (room) setPostData(room);

    }, [room])
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createRoom({ ...postData, name: user?.result?.name }, navigate));
            clear();
        } else {
            dispatch(updateRoom(currentId, postData));
            clear();
        }
    };
    const clear = () => {
        setCurrentId(0);
        setPostData({
            RoomName: "",
            description: "",
            Capacity: "",
            Location: "",
            remark: "",
        });
    };
    return (
        <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">

            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
                    {currentId ? `Editing "${room.title}"` : 'Create a Room'}
                </h4>


                <div className="mb-10 flex items-center ">
                    <div className="h-px w-full bg-gray-200 " />
                </div>
                <label class="font-semibold text-sm text-navy-700 pb-1 block">Room Name</label>

                <input required name="RoomName"
                    onChange={(e) => setPostData({ ...postData, RoomName: e.target.value })}
                    type="text"
                    value={postData.RoomName}
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    placeholder="Enter Room Name" />


                <label class="font-semibold text-sm text-navy-700 pb-1 block">Description</label>

                <input required name="description"
                    value={postData.description}
                    onChange={(e) =>
                        setPostData({ ...postData, description: e.target.value })
                    }
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    placeholder="Enter Description" />

                <label class="font-semibold text-sm text-navy-700 pb-1 block">Capacity</label>

                <input required name="Capacity"
                    value={postData.Capacity}
                    onChange={(e) =>
                        setPostData({ ...postData, Capacity: e.target.value })
                    }
                    type="number"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    placeholder="Enter Capacity" />

                <label class="font-semibold text-sm text-navy-700 pb-1 block">Location</label>

                <input required name="Location"
                    value={postData.Location}
                    onChange={(e) =>
                        setPostData({ ...postData, Location: e.target.value })
                    }
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    placeholder="Enter Location" />

                <label class="font-semibold text-sm text-navy-700 pb-1 block">Remarks</label>

                <input required name="remark"
                    value={postData.remark}
                    onChange={(e) =>
                        setPostData({ ...postData, remark: e.target.value })
                    }
                    type="text"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    placeholder="Enter Remark" />


                <button onClick={handleSubmit} type="submit" className="linear mt-2 w-full rounded-xl bg-[#422AFB] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[#3311DB] active:bg-[#2111A5] ">
                    Submit
                </button>
                <button onClick={clear} type="submit" className="linear mt-2 w-full rounded-xl bg-[#422AFB] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[#3311DB] active:bg-[#2111A5] ">
                    Clear
                </button>

            </div>
        </div>
    )
}

export default MainCreate
