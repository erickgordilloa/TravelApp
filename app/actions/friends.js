import * as actionTypes from "./actionTypes";
import { baseUrl } from "../api/mainApi";
import axios from "axios";

export const onRemoveError = () => {
  return {
    type: actionTypes.TRIPS_ALBUM_RESET,
  };
};

export const getFriends = () => async (dispatch, getState) => {
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
