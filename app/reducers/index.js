import { combineReducers } from "redux";
import AuthReducer from "./auth";
import ApplicationReducer from "./application";
import { tripsAlbumsReducer } from "./tripsAlbums";

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  tripsAlbums: tripsAlbumsReducer,
});
