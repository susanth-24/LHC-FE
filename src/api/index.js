import axios from "axios";

const API = axios.create({ baseURL: "https://lhc-be.vercel.app/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const signIn = (formData) => API.post('user/signin', formData);
export const signUp = (formData) => API.post('user/signup', formData);
export const userprofile = (id) => API.get(`/user/profile/${id}`);
export const changePassword=(data)=>API.patch('/user/changePassword',data);
export const notification=(data)=>API.post(`/user/notifications/`,data);
export const notification3=(data)=>API.post(`/user/notifications3/`,data);
export const notification4=(data)=>API.post(`/user/notifications4/`,data);
export const clearNotify=(id)=>API.delete(`user/clearNotify/${id}`);
export const fetchNotify=(id)=>API.get(`/user/fetchNotify/${id}`);
export const notification_1=(id,data)=>API.post(`/user/notification1/${id}`,data);
export const allusers=()=>API.get('/user/allusers');

export const blockroom=(data)=>API.post('/block',data);
export const getBlocks=()=>API.get('/block');
export const deleteBlock = (id) => API.delete(`/block/${id}`);

export const fetchRooms = () => API.get('/rooms');
export const createRoom = (newRoom) => API.post('/rooms', newRoom)
export const fetchRoom = (id) => API.get(`/rooms/${id}`)
export const fetchRoomsBysearch = (query) => API.get(`/rooms/search?date=${query.date.date}&startTime=${query.date.startTime}&endTime=${query.date.endTime}`)
export const updateAvail = (id, data) => API.post(`/rooms/${id}/update`, data)
export const approveAvail_1 = (id, id1) => API.post(`/rooms/${id}/approved_1`, id1)
export const rejectAvail_1 = (id, id1) => API.post(`/rooms/${id}/rejected_1`, id1)
export const approveAvail_2 = (id, id1) => API.post(`/rooms/${id}/approved_2`, id1)
export const rejectAvail_2 = (id, id1) => API.post(`/rooms/${id}/rejected_2`, id1)
export const approveAvail_3 = (id, id1) => API.post(`/rooms/${id}/approved_3`, id1)
export const rejectAvail_3 = (id, id1) => API.post(`/rooms/${id}/rejected_3`, id1)
export const withdrawAvail=(id,id1)=>API.post(`/rooms/${id}/withdrawed`,id1);
export const updateRoom=(id,upd)=>API.patch(`/rooms/${id}`,upd)
export const banRoom = (id) => API.patch(`/rooms/${id}/ban`)
export const unbanRoom = (id) => API.patch(`/rooms/${id}/unban`)


export const createRequest = (request) => API.post('/requests', request);
export const fetchRequests = () => API.get('/requests');
export const fetchRequest = (id) => API.get(`/requests/${id}`)
export const attend = (id) => API.patch(`/requests/${id}/attend`)
export const acceptReq_1 = (id) => API.patch(`/requests/${id}/accept_1`)
export const rejectReq_1 = (id,com) => API.patch(`/requests/${id}/reject_1`,com)
export const acceptReq_2 = (id) => API.patch(`/requests/${id}/accept_2`)
export const rejectReq_2 = (id,com) => API.patch(`/requests/${id}/reject_2`,com)
export const acceptReq_3 = (id) => API.patch(`/requests/${id}/accept_3`)
export const rejectReq_3 = (id,com) => API.patch(`/requests/${id}/reject_3`,com)
export const withdrawReq=(id)=>API.patch(`requests/${id}/withdraw`)
