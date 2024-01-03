import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  configureStore,
} from "@reduxjs/toolkit";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";

let rootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
  { reducer: rootReducers },
  //@ts-ignore
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
// let store = configureStore(
//   {reducer:reducers},
//   applyMiddleware(thunkMiddleware)
// )

  //@ts-ignore
window.store = store;
export default store;
