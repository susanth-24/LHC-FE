import * as api from '../api';
import { AUTH,SIGNUP, USER_PROFILE, DELETE_USER, CHANGE_PASSWORD, FETCH_NOTIFY, CLEAR_NOTIFY, ALLUSERS } from '../constants/actionTypes';

export const signin = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(input);
        dispatch({ type: AUTH, data });
        console.log(data?.result?.post)
        if(data?.result?.post==='Admin')
        {
            history('/admin/scheduler')
        }
        else if(data?.result?.post==='Executive')
        {
            history('/executive/scheduler')
        }
        else if(data?.result?.post==='Admin_1')
        {
            history('/adminOne/scheduler')
        }
        else if(data?.result?.post==='Admin_2')
        {
            history('/adminTwo/scheduler')

        }
        else{
            history('/xyz')
        }
        location.reload()
    } catch (error) {
        throw error;
    }
}
export const changedPassword=(data,history)=> async (dispatch) =>{
    try {
        console.log(data)
        const {da}=await api.changePassword(data);
        dispatch({type:CHANGE_PASSWORD,payload:{da}})
        history('/')
        location.reload()
    } catch (error) {
        throw error;
    }
}
export const userProfile = (id) => async (dispatch) => {
    try {
        
        const { data } = await api.userprofile(id);

        dispatch({ type: USER_PROFILE, payload: { data } });
    } catch (error) {
        throw error
    }
}
export const signup = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(input);
        dispatch({ type: SIGNUP, data });
        history(/admin/createagent)
    } catch (error) {
        throw error
    }
}
export const fetchNotify = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchNotify(id);
        //console.log(data)
        dispatch({ type: FETCH_NOTIFY, payload:data });
        
    } catch (error) {
        console.log("b")
        throw error
    }
}
export const clearNotify=(id)=>async(dispatch)=>{
    try {
        await api.clearNotify(id);
        dispatch({type:CLEAR_NOTIFY});
    } catch (error) {
        
    }
}
export const allusers=()=>async(dispatch)=>{
    try {
        const { data }=await api.allusers();
        //console.log(data)
        dispatch({type:ALLUSERS,payload:data});
    } catch (error) {
        
    }
}

