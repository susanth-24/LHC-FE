import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Basic from './Basic';

const MainScheduler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="bg-white border-b rounded-t-lg border-gray-200 ">
            
                <Basic navigate={navigate} dispatch={dispatch}/>
            
        </div>
    )
}
export default MainScheduler