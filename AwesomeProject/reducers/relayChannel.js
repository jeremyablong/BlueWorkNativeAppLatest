import { RELAY_CHANNEL } from "../actions/types.js";

const initialState = {
	data: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case RELAY_CHANNEL: 
			return {
				...state, 
				channel: action.channel
			}
			
		default: 
			return state;
	}
}