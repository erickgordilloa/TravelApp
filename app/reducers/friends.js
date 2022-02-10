import * as actionTypes from "@actions/actionTypes";
const initialStateFriendList = {
  loading: false,
  error: "",
  listFriends: null,
};

export const friendListReducer = (
  state = initialStateFriendList,
  action = {}
) => {
  switch (action.type) {
    case actionTypes.TRIPS_ALBUM_CREATE_REQUEST:
      return {
        ...initialStateFriendList,
        loading: true,
      };
    case actionTypes.TRIPS_ALBUM_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        createtripAlbum: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_CREATE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_CREATE_RESET:
      return {
        ...initialStateFriendList,
      };
    case actionTypes.TRIPS_ALBUM_CREATE_GOBACK:
      return {
        ...initialStateFriendList,
        reset: true,
      };
    default:
      return state;
  }
};
