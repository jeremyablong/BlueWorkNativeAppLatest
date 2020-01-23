import { INIT_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import SendBird from 'sendbird';
import AsyncStorage from '@react-native-community/async-storage';

const APP_ID = '2D4258E6-F4B9-4568-AF93-B1824A4CA582';

export const sbConnect = (userId, nickname) => {
  console.log("sbConnect fired :", userId, nickname);
  return new Promise((resolve, reject) => {
    if (!userId) {
      console.log("userId is required.")
      reject('UserID is required.');
      return;
    }
    if (!nickname) {
      console.log("nickname is required.")
      reject('Nickname is required.');
      return;
    }
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) {
        reject('SendBird Login Failed.');
      } else {
        console.log("connected, I think?")
        resolve(sbUpdateProfile(nickname));
      }
    });
  });
};


export const sbUpdateProfile = nickname => {
  return new Promise((resolve, reject) => {
    if (!nickname) {
      reject('Nickname is required.');
      return;
    }
    let sb = SendBird.getInstance();
    if (!sb) sb = new SendBird({ appId: APP_ID });
    sb.updateCurrentUserInfo(nickname, null, (user, error) => {
      if (error) {
        reject('Update profile failed.');
      } else {
        AsyncStorage.setItem('sendbirdUser', JSON.stringify(user), () => {
          resolve(user);
        });
      }
    });
  });
};

export const initLogin = () => {
  return { type: INIT_LOGIN };
};

export const sendbirdLogin = ({ userId, nickname }) => {
  return dispatch => {
    return sbConnect(userId, nickname)
      .then(user => {
        console.log("Success USER :", user);
        loginSuccess(dispatch, user)
    })
      .catch(error => loginFail(dispatch, error));
  };
};

const loginFail = (dispatch, error) => {
  console.log("FAILED.")
  dispatch({
    type: LOGIN_FAIL,
    payload: error
  });
};

const loginSuccess = (dispatch, user) => {
  console.log("SUCCESS!")
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user
  });
};