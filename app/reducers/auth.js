import * as actionTypes from "@actions/actionTypes";
const initialState = {
  login: false,
  userInfo: {},
  token: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        state,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        login: true,
        userInfo: action.payload.user,
        token: action.payload.access_token,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        login: false,
        error: action.payload,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        login: false,
        error: action.payload,
      };
    case actionTypes.LOGIN_LOGOUT:
      return {
        login: false,
        userInfo: {},
        token: "",
      };
    default:
      return state;
  }
};
