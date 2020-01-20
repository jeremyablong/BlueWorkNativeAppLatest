import { USER, SIGNOUT, WORK_DATA, JOB_HISTORY, SAVE_UUID, GATHER_MESSAGES, SAVE_PROPS_DATA, STORE_MARKER_DATA, SAVE_LOCATION } from "./types.js";
import axios from "axios";

let messagesArr = [];

export const createUser = (item) => {
	return {
		type: "USER",
		payload: item
	}
}
export const signOut = (item) => {
	return {
		type: "USER",
		payload: item
	}
}
export const addWorkData = (item) => {
	return {
		type: "WORK_DATA",
		payload: item
	}
}
export const addJobHistory = (item) => {
	return {
		type: "JOB_HISTORY",
		payload: item
	}
}
export const saveEmail = (item) => {
	return {
		type: "SAVE_UUID",
		payload: item
	}
}
export const saveUUID = (item) => {
	return {
		type: "SAVE_UUID",
		payload: item
	}
}
export const savePropsData = (item) => {
	return {
		type: "SAVE_PROPS_DATA",
		payload: item
	}
}
export const storeMarkerData = (item) => {
	return {
		type: "STORE_MARKER_DATA",
		payload: item
	}
}


export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());
        firebase.database()
                .ref('messages')
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                    setTimeout(() => {
                        const messages = snapshot.val() || [];
                        dispatch(receiveMessages(messages))
                    }, 0);
                });
    }
}
export const receiveMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));
        dispatch(receivedMessages());
    }
}
export const login = () => {
    return function (dispatch) {
        dispatch(startAuthorizing());
        firebase.auth()
                .signInAnonymously()
                .then(() => {
                    dispatch(userAuthorized());
                    dispatch(fetchMessages());
                });
    }
}


export const saveLocation = (location) => {
	return {
		type: "SAVE_LOCATION",
		payload: location
	}
}

// export const loadState = () => {
// 	try {
// 		const serializedState = localStorage.getItem("state");
// 		if (serializedState === null) {
// 			return undefined;
// 		}
// 		return JSON.parse(serializedState);
// 	} catch(e) {
// 		return undefined;
// 		console.log(e);
// 	}
// }
// export const saveState = (state) => {
// 	try {
// 		const serializedState = JSON.stringify(state);
// 		localStorage.setItem("state", serializedState)
// 	} catch(e) {
// 		console.log(e);
// 	}
// }