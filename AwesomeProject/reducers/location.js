import { SAVE_LOCATION } from "../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_LOCATION: 
			return {
				...state, 
				data: action.payload
			}
			
		default: 
			return state;
	}
}
