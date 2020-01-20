import { JOB_HISTORY } from "../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case JOB_HISTORY: 
			return {
				...state,
				data: action.payload
			}
		default: 
			return state;
	}
}


