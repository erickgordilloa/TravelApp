import * as actionTypes from "./actionTypes";
import { baseUrl } from "../api/mainApi";
import axios from "axios";

const onLogin = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};

export const onRemoveError = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_RESET,
  });
  dispatch({
    type: actionTypes.UI_RESET,
  });
};

export const onLogOut = () => (dispatch) => {
  //call api and dispatch action case
  setTimeout(() => {
    dispatch({
      type: actionTypes.LOGIN_LOGOUT,
    });
  }, 500);
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.UI_REQUEST,
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
    dispatch(onLogin(data));
    dispatch({ type: actionTypes.UI_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.UI_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.UI_REQUEST,
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
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({ type: actionTypes.UI_SUCCESS });
    console.log(data);
  } catch (error) {
    dispatch({
      type: actionTypes.UI_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/* export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_INFO_REQUEST,
    });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${baseUrl}/userinfo`, {}, config);
    dispatch({
      type: actionTypes.USER_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.USER_INFO_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; */
