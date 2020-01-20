import { SAVE_PROPS_DATA } from "../actions/types.js";

const initialState = {
	data: {}
};

const messagesArray = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_PROPS_DATA: 
			return {
				...state, 
				data: action.payload
			}
			
		default: 
			return state;
	}
}

