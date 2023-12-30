import * as api from "../api";
import { DELETEBLOCK, FETCHBLOCKS } from "../constants/actionTypes";


export const blockroom = (input) => async (dispatch) => {
    try {
        const { data } = await api.blockroom(input);
        window.alert('The room has been blocked');
       
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export const getBlocks = () => async (dispatch) => {
    try {
        const { data } = await api.getBlocks();
        console.log(data)
        dispatch({ type: FETCHBLOCKS, payload: data });
    } catch (error) {
         console.log(error)
        //throw error;
    }
};
export const deleteBlock = (id) => async (dispatch) => {
    try {
      await api.deleteBlock(id);
      dispatch({ type: DELETEBLOCK, payload: id });
    } catch (error) {
      //throw error;
    }
  }