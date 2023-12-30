import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_ROOM, CREATE, UPDATE, DELETE, FETCH_ROOM_BOOK, UPDATE_AVAIL } from '../constants/actionTypes';


const rooms=(state = { isLoading: true, rooms: [] }, action) => {
    switch (action.type) {
      case 'START_LOADING':
        return { ...state, isLoading: true };
      case 'END_LOADING':
        return { ...state, isLoading: false };
      case FETCH_ALL:
        console.log(state)
        return {
          ...state,
          rooms: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_BY_SEARCH:
        return { ...state, rooms: action.payload.data };
      case FETCH_ROOM:
        return { ...state, room: action.payload.room };
      case FETCH_ROOM_BOOK:
        return{...state,room:action.payload.room,date:action.payload.date,startTime:action.payload.startTime,endTime:action.payload.endTime}
      case CREATE:
        return { ...state, rooms: [...state.rooms, action.payload] };
      case UPDATE:
        return { ...state, rooms: state.rooms.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case DELETE:
        return { ...state, rooms: state.rooms.filter((post) => post._id !== action.payload) };
      
  
      default:
        return state;
    }
  };

export default rooms
