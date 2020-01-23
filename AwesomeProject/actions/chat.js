import { SEND_MESSAGE_FAIL, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_TEMPORARY, MESSAGE_LIST_SUCCESS, MESSAGE_LIST_FAIL } from "./types.js";
import axios from "axios";
import SendBird from 'sendbird';

const APP_ID = '2D4258E6-F4B9-4568-AF93-B1824A4CA582';

const sendBirdConnection = new SendBird({ 'appId': APP_ID });



export const sbSendTextMessage = (channel, textMessage, callback) => {
  // if (channel.isGroupChannel()) {
  //   channel.endTyping();
  // }
  return channel.sendUserMessage(textMessage, (message, error) => {
  	if (error) {
  		console.log(error);
  	}
  	console.log("message :", message);
    callback(message, error);
  });
};


export const onSendButtonPress = ({ channelUrl, isOpenChannel, textMessage, userId }) => {
  return dispatch => {
    if (isOpenChannel) {
      return sbGetOpenChannel(channelUrl, userId)
        .then((channel) => {
          console.log("channel one :", channel);
          sendTextMessage(dispatch, channel, textMessage);
        })
        .catch((error) => {
        	console.log("sbGetOpenChannel error one :", error);
        	dispatch({ 
        		type: SEND_MESSAGE_FAIL 
        	})
        });
    } else {
      return sbGetGroupChannel(channelUrl)
        .then(channel => {
          console.log("onSendButtonPress channel two :", channel);
          sendTextMessage(dispatch, channel, textMessage);
        })
        .catch((error) => {
        	console.log("onSendButtonPress last error :", error);
        	dispatch({ 
        		type: SEND_MESSAGE_FAIL 
        	})
        });
    }
  };
};

const sbGetOpenChannel = (channelUrl, userId) => {
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

const sendTextMessage = (dispatch, channel, textMessage) => {
  const messageTemp = sbSendTextMessage(channel, textMessage, (message, error) => {
    if (error) {
      console.log("err in text msg:", error);
      dispatch({ 
      	type: SEND_MESSAGE_FAIL 
      });
    } else {
      console.log("success message :", message);
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        message: message
      });
    }
  });
  dispatch({
    type: SEND_MESSAGE_TEMPORARY,
    message: messageTemp
  });
};

export const sbTypingStart = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.startTyping();
        resolve(channel);
      })
      .catch(error => reject(error));
  });
};

export const sbTypingEnd = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.endTyping();
        resolve(channel);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sbGetMessageList = previousMessageListQuery => {
  const limit = 30;
  const reverse = true;
  return new Promise((resolve, reject) => {
    previousMessageListQuery.load(limit, reverse, (messages, error) => {
      if (error) {
      	console.log("there was an error in sbGetMessageList :", error);
        reject(error);
      } else {
      	console.log("MESSAGES! :", messages);
        resolve(messages);
      }
    });
  });
};

export const getPrevMessageList = (previousMessageListQuery) => {
  return dispatch => {
    if (previousMessageListQuery.hasMore) {
      return sbGetMessageList(previousMessageListQuery)
        .then((messages) => {
       	  console.log("messages :", messages);
          dispatch({
            type: MESSAGE_LIST_SUCCESS,
            list: messages
          });
        })
        .catch((error) => {
        	console.log("catch error getPrevMessageList", error);
        	dispatch({ type: MESSAGE_LIST_FAIL })
        });
    } else {
      dispatch({ type: MESSAGE_LIST_FAIL });
      return Promise.resolve(true);
    }
  };
};

export const sbCreatePreviousMessageListQuery = ({ channelUrl, isOpenChannel, userId }) => {
  return new Promise((resolve, reject) => {
    if (isOpenChannel) {
      console.log("Open channel statement ran...");
      sbGetOpenChannel(channelUrl, userId)
        .then(channel => {
        	console.log("Success - :", channel);
        	resolve(channel.createPreviousMessageListQuery())
        })
        .catch((error) => {
        	console.log("catch error :", error);
        	reject(error)
        });
    } else {
      console.log("else statement ran.")
      sbGetGroupChannel(channelUrl)
        .then(channel => resolve(channel.createPreviousMessageListQuery()))
        .catch(error => reject(error));
    }
  });
};
