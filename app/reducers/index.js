import { combineReducers } from "redux";
import AuthReducer from "./auth";
import RegisterReducer from "./register";
import UiReducer from "./ui";
import ApplicationReducer from "./application";
import {
  tripsAlbumsReducer,
  tripsAlbumsIdReducer,
  homeListReducer,
  tripFilesListReducer,
} from "./tripsAlbums";

export default combineReducers({
  auth: AuthReducer,
  ui: UiReducer,
  application: ApplicationReducer,
  register: RegisterReducer,
  homeList: homeListReducer,
  tripsAlbums: tripsAlbumsReducer,
  tripsAlbumsId: tripsAlbumsIdReducer,
  tripFilesList: tripFilesListReducer,
});
