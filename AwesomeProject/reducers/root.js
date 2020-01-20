import { USER, SIGNOUT } from "../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER: 
			return {
				...state,
				data: action.payload
			}
		case SIGNOUT:
			return {
				...state,
				data: null
			}
		default: 
			return state;
	}
}