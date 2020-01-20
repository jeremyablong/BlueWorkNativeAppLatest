import SendBird from 'sendbird';
import { CREATE_CHANNEL } from "./types.js";

const APP_ID = '2D4258E6-F4B9-4568-AF93-B1824A4CA582';

const sendBirdConnection = new SendBird({ 'appId': APP_ID });


export const sbCreateOpenChannel = async (channelName, userId) => {
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
            console.log("else statement ran")
            sb.OpenChannel.createChannel(channelName, null, null, (channel, error) => {
              if (error) {
                console.log("Create OpenChannel Failed.", error);
                return {
                    type: CREATE_CHANNEL,
                    payload: error
                }
                reject('Create OpenChannel Failed.');
              } else {
                console.log("resolved!! - Success.");
                return {
                    type: CREATE_CHANNEL,
                    payload: channel
                }
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