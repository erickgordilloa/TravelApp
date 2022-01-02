import * as actionTypes from "./actionTypes";
import { baseUrl } from "../api/mainApi";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onLogin = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};

export const authentication = (data, callback) => (dispatch) => {
  //call api and dispatch action case
  setTimeout(() => {
    /* let data = {
      success: login,
    }; */
    dispatch(onLogin(data));
    if (typeof callback === "function") {
      callback({ success: true });
    }
  }, 500);
};

export const onLogOut = () => (dispatch) => {
  //call api and dispatch action case
  setTimeout(() => {
    dispatch({
      type: actionTypes.LOGIN_LOGOUT,
    });
  }, 500);
};

export const login = (email, password, callback) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${baseUrl}/auth/login`,
      { email, password },
      config
    );
    dispatch(authentication(data, callback));
    console.log(data);
    //localStorage.setItem("userInfo", JSON.stringify(data));
    //await AsyncStorage.setItem("token", data.access_token);
    //await AsyncStorage.setItem("userInfo", data.user);
  } catch (error) {
    //dispatch(authentication(false, callback));
    console.log(error);
    /* dispatch({
      type: actionTypes.LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); */
  }
};
