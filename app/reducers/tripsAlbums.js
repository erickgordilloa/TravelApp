import * as actionTypes from "@actions/actionTypes";

const initialStateTripsAlbums = {
  loading: false,
  error: "",
  tripsAlbums: null,
};

export const tripsAlbumsReducer = (
  state = initialStateTripsAlbums,
  action = {}
) => {
  switch (action.type) {
    case actionTypes.TRIP_ALBUMS_REQUEST:
      return {
        ...initialStateTripsAlbums,
        loading: true,
      };
    case actionTypes.TRIP_ALBUMS_SUCCESS:
      return {
        ...state,
        loading: false,
        huecas: action.payload,
      };
    case actionTypes.TRIP_ALBUMS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.TRIP_ALBUMS_RESET:
      return {
        ...initialStateTripsAlbums,
      };
    default:
      return state;
  }
};
