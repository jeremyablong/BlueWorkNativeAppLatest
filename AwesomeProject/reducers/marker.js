import { STORE_MARKER_DATA } from "../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case STORE_MARKER_DATA: 
			return {
				...state, 
				data: action.payload
			}
			
		default: 
			return state;
	}
}

