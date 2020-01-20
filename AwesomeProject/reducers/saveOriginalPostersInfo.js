import { SAVE_UUID } from "../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_UUID: 
			return {
				...state,
				data: action.payload
			}
		default: 
			return state;
	}
}