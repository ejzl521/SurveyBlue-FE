import {persistReducer} from "redux-persist";
import {AuthReducer} from "./reducers/AuthReducer";
import {createStore, combineReducers} from "redux";
// sessionStorage 사용
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
  key: "root",
  //local storage에 저장
  storage: sessionStorage };

const allReducers = combineReducers({
  Auth: AuthReducer
});

const store = createStore(persistReducer(persistConfig, allReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;