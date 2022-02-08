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
    case actionTypes.TRIPS_ALBUM_REQUEST:
      return {
        ...initialStateTripsAlbums,
        loading: true,
      };
    case actionTypes.TRIPS_ALBUM_SUCCESS:
      return {
        ...state,
        loading: false,
        tripsAlbums: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_RESET:
      return {
        ...initialStateTripsAlbums,
      };
    default:
      return state;
  }
};

const initialStateTripsAlbumsId = {
  loading: false,
  error: "",
  infoTripsAlbums: null,
};

export const tripsAlbumsIdReducer = (
  state = initialStateTripsAlbumsId,
  action = {}
) => {
  switch (action.type) {
    case actionTypes.TRIPS_ALBUM_INFO_REQUEST:
      return {
        ...initialStateTripsAlbumsId,
        loading: true,
      };
    case actionTypes.TRIPS_ALBUM_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        infoTripsAlbums: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_INFO_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_INFO_RESET:
      return {
        ...initialStateTripsAlbumsId,
      };
    default:
      return state;
  }
};

const initialStateHome = {
  loading: false,
  error: "",
  listHome: null,
};

export const homeListReducer = (state = initialStateHome, action = {}) => {
  switch (action.type) {
    case actionTypes.HOME_LIST_REQUEST:
      return {
        ...initialStateHome,
        loading: true,
      };
    case actionTypes.HOME_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        listHome: action.payload,
      };
    case actionTypes.HOME_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.HOME_LIST_RESET:
      return {
        ...initialStateHome,
      };
    default:
      return state;
  }
};

const initialStateTripFiles = {
  loading: false,
  error: "",
  tripFiles: null,
};

export const tripFilesListReducer = (
  state = initialStateTripFiles,
  action = {}
) => {
  switch (action.type) {
    case actionTypes.TRIPS_ALBUM_FILES_REQUEST:
      return {
        ...initialStateTripFiles,
        loading: true,
      };
    case actionTypes.TRIPS_ALBUM_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        tripFiles: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_FILES_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.TRIPS_ALBUM_FILES_RESET:
      return {
        ...initialStateTripFiles,
      };
    default:
      return state;
  }
};
