import * as actionTypes from "./actionTypes";
import { baseUrl } from "../api/mainApi";
import axios from "axios";

export const onRemoveError = () => {
  return {
    type: actionTypes.TRIPS_ALBUM_RESET,
  };
};
export const onRemoveErrorId = () => {
  return {
    type: actionTypes.TRIPS_ALBUM_INFO_RESET,
  };
};

export const onRemoveErrorHome = () => {
  return {
    type: actionTypes.HOME_LIST_RESET,
  };
};

export const getTripsAlbum = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.TRIPS_ALBUM_REQUEST,
    });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${baseUrl}/TripsGetAlbums`, {}, config);
    dispatch({
      type: actionTypes.TRIPS_ALBUM_SUCCESS,
      payload: data.info,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRIPS_ALBUM_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTripsAlbumId = (idtrip) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.TRIPS_ALBUM_INFO_REQUEST,
    });
    console.log(`${baseUrl}/TripsGetAlbums`);
    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${baseUrl}/TripDetail`,
      { idtrip },
      config
    );
    console.log("data", data);
    dispatch({
      type: actionTypes.TRIPS_ALBUM_INFO_SUCCESS,
      payload: data.info,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRIPS_ALBUM_INFO_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTripsAlbumFiles = (idtrip) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.TRIPS_ALBUM_FILES_REQUEST,
    });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${baseUrl}/TripGetFiles`,
      { idtrip },
      config
    );
    console.log("data", data);
    dispatch({
      type: actionTypes.TRIPS_ALBUM_FILES_SUCCESS,
      payload: data.info,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRIPS_ALBUM_FILES_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHome = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.HOME_LIST_REQUEST,
    });
    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${baseUrl}/homeListPicture`, config);
    console.log("data", data);
    dispatch({
      type: actionTypes.HOME_LIST_SUCCESS,
      payload: data.pictures,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.HOME_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
