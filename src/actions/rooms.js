import * as api from "../api";
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_ROOM, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, FETCH_ROOM_BOOK, UPDATE_AVAIL,  WITHDRAW_AVAIL, APPROVE_AVAIL_1, REJECT_AVAIL_1, APPROVE_AVAIL_2, REJECT_AVAIL_2, APPROVE_AVAIL_3, REJECT_AVAIL_3, FETCH_NOTIFY } from "../constants/actionTypes";

export const getRooms = () => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchRooms();
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updateRoom=(id,upd)=>async (dispatch) => {
    try {
        const {data}=await api.updateRoom(id,upd);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        
    }
}

export const createRoom = (room, history) => async (dispatch) => {
    try {
        const { data } = await api.createRoom(room);
        history(`/admin/createroom`);
        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error);
    }
}

export const getRoom = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchRoom(id);

        dispatch({ type: FETCH_ROOM, payload: { room: data } });
        dispatch({ type: END_LOADING });

    } catch (error) {
        //throw error;
    }
};

export const getRoomBook=(id,date,startTime,endTime)=>async(dispatch)=>{
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchRoom(id);
        dispatch({type:FETCH_ROOM_BOOK,payload:{room:data,date:date,startTime:startTime,endTime:endTime}})
        dispatch({ type: END_LOADING });

    } catch (error) {
        
    }
}

export const getRoomsBySearch=(date,startTime,endTime)=>async(dispatch)=>{
    try {
        dispatch({ type: START_LOADING });
        console.log(date,startTime,endTime)
        const queryParameters = {
            date: date,
            startTime: startTime,
            endTime: endTime,
        };
        const data=await api.fetchRoomsBysearch(queryParameters);
        console.log(data)
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error)
    }
}

export const updateAvail=(id,datas)=>async(dispatch)=>{
    try {
        const data  = await api.updateAvail(id,datas);
        console.log(datas)
        dispatch({type:UPDATE_AVAIL,payload:data});
        return data;
    } catch (error) {
        
    }
}
export const approveAvail_1=(id,id1)=>async(dispatch)=>{
    try {
        console.log(id1)
        const data=await api.approveAvail_1(id,id1);
        dispatch({type:APPROVE_AVAIL_1,payload:data});
    } catch (error) {
        
    }
}
export const rejectAvail_1=(id,id1)=>async(dispatch)=>{
    try {
        console.log(id1)
        const data=await api.rejectAvail_1(id,id1);
        dispatch({type:REJECT_AVAIL_1,payload:data});
    } catch (error) {
        
    }
}
export const approveAvail_2=(id,id1)=>async(dispatch)=>{
    try {
        console.log(id1)
        const data=await api.approveAvail_2(id,id1);
        dispatch({type:APPROVE_AVAIL_2,payload:data});
    } catch (error) {
        
    }
}
export const rejectAvail_2=(id,id1)=>async(dispatch)=>{
    try {
        console.log(id1)
        const data=await api.rejectAvail_2(id,id1);
        dispatch({type:REJECT_AVAIL_2,payload:data});
    } catch (error) {
        
    }
}
export const approveAvail_3=(id,id1)=>async(dispatch)=>{
    try {
        console.log(id1)
        const data=await api.approveAvail_3(id,id1);
        dispatch({type:APPROVE_AVAIL_3,payload:data});
    } catch (error) {
        
    }
}
export const rejectAvail_3=(id,id1)=>async(dispatch)=>{
    try {
        console.log(id1)
        const data=await api.rejectAvail_3(id,id1);
        dispatch({type:REJECT_AVAIL_3,payload:data});
    } catch (error) {
        
    }
}
export const withdrawAvail=(id,id1)=>async(dispatch)=>{
    try {
        console.log(id1)
        const data=await api.withdrawAvail(id,id1);
        dispatch({type:WITHDRAW_AVAIL,payload:data});
    } catch (error) {
        
    }
}

export const banRoom = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.banRoom(id);
        console.log(data);
        window.location.reload();
        //dispatch({ type: WITHDRAW_REQUEST, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const unbanRoom = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.unbanRoom(id);
        console.log(data);
        window.location.reload();
        //dispatch({ type: WITHDRAW_REQUEST, payload: data });
    } catch (error) {
        //throw error;
    }
}