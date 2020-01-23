import { combineReducers } from "redux";
import rootReducer from "./root.js";
import workDataReducer from "./userDataBio.js";
import workData from "./workData.js";
import savePropsData from "./messages.js";
import uuid from "./uuidTracking.js";
import marker from "./marker.js";
import location from "./location.js";
import channels from "./channels.js";
import SBlogin from "./loginSB.js";
import chatReducer from "./chatReducer.js";
import relayChannel from "./relayChannel.js";

export default combineReducers({
	userData: rootReducer,
	bioData: workDataReducer,
	jobHistory: workData,
	savePropsData,
	uuid,
	marker,
	location,
	channels,
	SBlogin,
	chatReducer,
	relayChannel
});