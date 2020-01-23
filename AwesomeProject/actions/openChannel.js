import SendBird from 'sendbird';
import { OPEN_CHANNEL_LIST_SUCCESS, OPEN_CHANNEL_LIST_FAIL, RESET, RELAY_CHANNEL } from "./types.js";
import axios from "axios";
import { store } from "../store/store.js";


const APP_ID = '2D4258E6-F4B9-4568-AF93-B1824A4CA582';

const sendBirdConnection = new SendBird({ 'appId': APP_ID });


export const sbCreateOpenChannel = async (channelName, userId, propsData, message) => {
  return new Promise((resolve, reject) => {
    if (!channelName) {
      console.log("Channel name is required.")
      reject('Channel name is required.');
    }
    const sb = SendBird.getInstance();

    sendBirdConnection.connect(userId, (user, error) => {
        if (error) {
            console.log('SendBird Login Failed.', error)
            reject('SendBird Login Failed.');
        } else {
            // console.log("else statement ran")
            sb.OpenChannel.createChannel(channelName, null, null, (channel, error) => {
              if (error) {
                console.log("Create OpenChannel Failed.", error);
                alert("Auth Token Expired... Message FAILED. Please log out and log back in.");
                reject('Create OpenChannel Failed.');
              } else {
                console.log("resolved!! - Success.", channel);

                
                store.dispatch({
                    type: "RELAY_CHANNEL",
                    channel: channel 
                })

                axios.post("http://172.31.99.114:5000/register/channelURL", {
                    channelURL: channel.url,
                    email: store.getState().userData.data.email
                }).then((res) => {
                    console.log("axios action.creator res.data :", res.data);
                }).catch((err) => {
                    console.log("axios error action creator.")
                });

                axios.post("http://172.31.99.114:5000/register/channelURL", {
                    channelURL: channel.url,
                    email: propsData.email
                }).then((res) => {
                    console.log("axios action.creator res.data :", res.data);
                }).catch((err) => {
                    console.log("axios error action creator.")
                });
                
                resolve(channel);
                
              }
            });
        }
    })
  }).catch((err) => {
    console.log(err);
    reject(error);
  });
};

// export const sbCreateOpenChannelListQuery = (userId) => {
//     sendBirdConnection.connect(userId, (user, error) => {
//         if (error) {
//             console.log('SendBird Login Failed.', error)
//             reject('SendBird Login Failed.');
//         } else {
//             console.log("Successfully connected.")
//             const sb = SendBird.getInstance();
//             return sb.OpenChannel.createOpenChannelListQuery();
//             // console.log("MAGIC :", sb.OpenChannel.createOpenChannelListQuery())
//         }
//     })
// };


export const sbCreateOpenChannelListQuery = () => {
  const sb = SendBird.getInstance();
  console.log("sb.OpenChannel.createOpenChannelListQuery()", sb.OpenChannel.createOpenChannelListQuery());
  return sb.OpenChannel.createOpenChannelListQuery();
};

export const sbGetOpenChannelList = ({ openChannelListQuery, userId }) => {
  return new Promise((resolve, reject) => {
    sendBirdConnection.connect(userId, (user, error) => {
        if (error) {
            console.log('SendBird Login Failed.', error)
            reject('SendBird Login Failed.');
        } else {
            openChannelListQuery.next((channels, error) => {
              if (error) {
                console.log("error", error);
                reject(error);
              } else {
                console.log("channels", channels);
                resolve(channels);
              }
            });
        }
    })
  });
};

export const clearReduxState = (item) => {
    return {
        type: RESET,
        payload: item
    }
}

export const getOpenChannelList = ({ openChannelListQuery, userId }) => {
  return dispatch => {
    if (openChannelListQuery.hasNext) {
      return sbGetOpenChannelList({ 
            openChannelListQuery: openChannelListQuery, 
            userId: userId
        })
        .then((channels) => {
          dispatch({
            type: OPEN_CHANNEL_LIST_SUCCESS,
            list: channels
          })
          console.log("channels success:", channels);
        }).catch(error => {
            console.log("error catch :", error)
            dispatch({ 
                type: OPEN_CHANNEL_LIST_FAIL 
            })
        });
    } else {
      console.log("uh oh - else statment ran.")
      dispatch({ 
        type: OPEN_CHANNEL_LIST_FAIL 
      });
      return Promise.resolve(true);
    }
  };
};

export const sbGetOpenChannel = ({ channelUrl , userId }) => {
  return new Promise((resolve, reject) => {
    sendBirdConnection.connect(userId, (user, error) => {
        if (error) {
            console.log('SendBird Login Failed.', error)
            reject('SendBird Login Failed.');
        } else {
            const sb = SendBird.getInstance();
            sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
              if (error) {
                console.log(error);
                reject(error);
              } else {
                console.log(channel);
                channel.enter((response, error) => {
                  if (error) {
                    console.log(error);
                    reject(error);
                  } else {
                    console.log(channel);
                    resolve(channel);
                  }
                });
              }
            });
        }
    })
  });
};

export const sbOpenChannelEnter = ({ channel, userId }) => {
  return new Promise((resolve, reject) => {
    sendBirdConnection.connect(userId, (user, error) => {
        if (error) {
            console.log('SendBird Login Failed.', error)
            reject('SendBird Login Failed.');
        } else {
            channel.enter((response, error) => {
              if (error) {
                console.log(error);
                reject(error);
              } else {
                console.log(channel);
                resolve(channel);
              }
            });
        }
    })
  });
};


