import { 
    OPEN_CHANNEL_LIST_SUCCESS,
    OPEN_CHANNEL_LIST_FAIL
} from './types.js';
import { sbGetOpenChannelList
    // sbGetOpenChannel, 
    // sbOpenChannelExit 
} from './openChannel.js';

export const getOpenChannelList = (openChannelListQuery) => {
    return (dispatch) => {
        if (openChannelListQuery.hasNext) {
            sbGetOpenChannelList(openChannelListQuery)
            .then((channels) => dispatch({
                type: OPEN_CHANNEL_LIST_SUCCESS,
                list: channels
            }))
            .catch((error) => dispatch({ type: OPEN_CHANNEL_LIST_FAIL }))
        } else {
            dispatch({ type: OPEN_CHANNEL_LIST_FAIL });
        }
    }
}