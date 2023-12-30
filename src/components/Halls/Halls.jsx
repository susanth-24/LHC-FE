import React, { useState, useEffect } from 'react'
import gradient from '../../assets/gradient.jpg';
import { FaHome } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userProfile } from '../../actions/auth';
import { getRooms } from '../../actions/rooms'
import { useNavigate } from 'react-router-dom';
import MainCreate from '../CreateRoom/MainCreate';
import Hall from './Hall';

const Halls = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRooms());
    }, [])
    const [currentId, setCurrentId] = useState(0);
    const { rooms, isLoading } = useSelector((state) => state.rooms);

    return (
        <>
            <div className="flex w-full flex-col gap-5">
                
                <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
                    {rooms.length === 0 ? (
                        <p className="text-center mt-4 text-black">Halls Coming Soon</p>
                    ) : (
                        < >
                            {rooms.map((post) => (
                                <div key={post._id} className="col-span-6 lg:!mb-0">
                                <Hall post={post} setCurrentId={setCurrentId}/>
                            </div>
                            ))}
                        </>
                    )}
                    

                </div>
                {currentId !== 0 && <MainCreate currentId={currentId} setCurrentId={setCurrentId} />}

            </div>
        </>
    )
}

export default Halls
