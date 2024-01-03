import axios from "axios"; 
import { ProfileType, UserType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "79533715-5b3d-4fc6-8040-d93494a99155_"
    }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null,
}
export type APIResponseType<D = {},RC = ResultCodesEnum> = {
  data: D,
  messages: Array<string>,
  resultCode: RC
}