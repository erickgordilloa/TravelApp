import * as actionTypes from "@actions/actionTypes";
const initialState = {
  loading: false,
  error: "",
  login: false,
  token: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.access_token,
        login: true,
      };
    case actionTypes.REGISTER_ERROR:
      return {
        loading: false,
        login: false,
        error: action.payload,
      };
    case actionTypes.REGISTER_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
