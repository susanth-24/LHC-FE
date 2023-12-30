import { DELETEBLOCK, FETCHBLOCKS } from "../constants/actionTypes";

export default (state = { isLoading: true, blocks: [] }, action) => {
    switch (action.type) {
        case FETCHBLOCKS:
            return {
                ...state,
                blocks: action.payload
            };

        case DELETEBLOCK:
            return { ...state, blocks: state.blocks.filter((post) => post._id !== action.payload) };

        default:
            return state;
    }
};