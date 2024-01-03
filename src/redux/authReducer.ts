import { stopSubmit } from "redux-form"
import { ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import { authAPI } from "../api/authApi";
import { securityAPI } from "../api/securityApi";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { Action } from "redux";

let initialState = {
  Id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/auth/SET_USER_DATA":
    case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "SN/auth/SET_USER_DATA",
    payload: { id, email, login, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "SN/auth/GET_CAPTCHA_URL_SUCCESS",
    payload: { captchaUrl},
  } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let {id,email,login} = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
      dispatch(getCaptchaUrl())
    }
    let message =
      data.messages.length > 0
        ? data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};
export const getCaptchaUrl = (): BaseThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};
export const logout = (): ThunkType => async (dispatch: any) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};
export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>> 