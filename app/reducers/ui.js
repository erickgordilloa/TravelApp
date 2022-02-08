import * as actionTypes from "@actions/actionTypes";
const initialState = {
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.UI_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case actionTypes.UI_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UI_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.UI_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
