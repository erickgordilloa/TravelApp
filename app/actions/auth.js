import * as actionTypes from "./actionTypes";
import { baseUrl } from "../api/mainApi";
import axios from "axios";

const onLogin = (data, type) => {
  return {
    type,
    payload: data,
  };
};

export const authentication = (data, type, callback) => (dispatch) => {
  //call api and dispatch action case
  setTimeout(() => {
    dispatch(onLogin(data, type));
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
      `${baseUrl}/login`,
      { email, password },
      config
    );
    dispatch(authentication(data, actionTypes.LOGIN_SUCCESS, callback));
    console.log(data);
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

export const register =
  (name, email, password, callback) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/register`,
        { name, email, password },
        config
      );
      dispatch(authentication(data, actionTypes.REGISTER_SUCCESS, callback));
      console.log(data);
    } catch (error) {
      //dispatch(authentication(false, callback));
      console.log(error);
    }
  };
