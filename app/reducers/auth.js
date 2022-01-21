import * as actionTypes from "@actions/actionTypes";
const initialState = {
  login: false,
  loading: false,
  userInfo: null,
  token: "",
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: true,
        loading: false,
        userInfo: action.payload.user,
        token: action.payload.access_token,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        login: false,
        loading: false,
        error: action.payload,
      };
    case actionTypes.LOGIN_LOGOUT:
      return {
        ...initialState,
      };
    case actionTypes.LOGIN_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
