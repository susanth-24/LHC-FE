import * as api from "../api";
import {  ACCEPT_REQUEST_1, ACCEPT_REQUEST_2, ACCEPT_REQUEST_3, CREATE_REQUEST, END_LOADING, FETCH_REQUEST, FETCH_REQUESTS,  REJECT_REQUEST_1, REJECT_REQUEST_2, REJECT_REQUEST_3, START_LOADING, WITHDRAW_REQUEST } from "../constants/actionTypes";

export const createRequest=(post, history)=>async(dispatch)=>{
    try {
        console.log(post)
        const {data}=await api.createRequest(post);
        await api.notification(post);
        //window.alert("Your Request has been submitted, wait for verification")
        //history('/BookHall')
        dispatch({ type: CREATE_REQUEST, payload: data });
    } catch (error) {
        throw error;
    }
}
export const getRequests = () => async (dispatch) => {
    console.log("sf")
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchRequests();
        console.log(data)
        dispatch({ type: FETCH_REQUESTS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
         console.log(error)
        //throw error;
    }
};

export const getRequest = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchRequest(id);

        dispatch({ type: FETCH_REQUEST, payload:data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        //throw error;
    }
};

export const acceptRequest_1 = (dat) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.acceptReq_1(dat?._id, user?.token);
        const pat={
            name:user?.result?.name,
            session:dat?.sessionName,
            status:"accepted",
        }
        
        await api.notification_1(dat.requestedBy,pat)
        
        dispatch({ type: ACCEPT_REQUEST_1, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const rejectRequest_1 = (dat,com) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.rejectReq_1(dat?._id,com, user?.token);
        const pat={
            name:user?.result?.name,
            session:dat?.sessionName,
            status:"rejected",
        }
        await api.notification_1(dat.requestedBy,pat)
        dispatch({ type: REJECT_REQUEST_1, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const acceptRequest_2 = (dat) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.acceptReq_2(dat?._id, user?.token);
        const pat={
            name:user?.result?.name,
            session:dat?.sessionName,
            status:"accepted",
        }
        const sending={
            name:dat?.name,
            RoomName:dat?.RoomName
        }
        await api.notification4(sending)
        await api.notification_1(dat.requestedBy,pat)
        dispatch({ type: ACCEPT_REQUEST_2, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const rejectRequest_2 = (dat,com) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.rejectReq_2(dat?._id,com, user?.token);
        const pat={
            name:user?.result?.name,
            session:dat?.sessionName,
            status:"rejected",
        }
        await api.notification_1(dat.requestedBy,pat)
        dispatch({ type: REJECT_REQUEST_2, payload: data });
    } catch (error) {
        //throw error;
    }
}

export const acceptRequest_3 = (dat) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.acceptReq_3(dat?._id, user?.token);
        const pat={
            name:user?.result?.name,
            session:dat?.sessionName,
            status:"accepted",
        }
        const sending={
            name:dat?.name,
            RoomName:dat?.RoomName,
            category:dat?.category,
        }
        console.log(sending)
        await api.notification3(sending)
        await api.notification_1(dat.requestedBy,pat)
        dispatch({ type: ACCEPT_REQUEST_3, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const rejectRequest_3 = (dat,com) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        console.log(com)
        const { data } = await api.rejectReq_3(dat?._id,com, user?.token);
        const pat={
            name:user?.result?.name,
            session:dat?.sessionName,
            status:"rejected",
        }
        await api.notification_1(dat.requestedBy,pat)
        dispatch({ type: REJECT_REQUEST_3, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const withdrawRequest = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.withdrawReq(id, user?.token);
        dispatch({ type: WITHDRAW_REQUEST, payload: data });
    } catch (error) {
        //throw error;
    }
}