import { Dispatch } from "redux";
import { PhotosType, UserType } from "../types/types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/usersApi";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage : 1,
  isFetching : true,
  followingInProgress: [] as Array<number>, // array of users id's,
  filter: {
    term: '',
    friend: null as null | boolean
  }
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case "SN/USERS/UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case "SN/USERS/SET_USERS": {
      return { ...state, users: action.users };
    }
    case "SN/USERS/SET_CURRENT_PAGE": {
      return {...state, currentPage:action.currentPage}
    }
    case "SN/USERS/SET_TOTAL_USERS_COUNT":{
      return {...state,totalUsersCount:action.count}
    }
    case "SN/USERS/TOGGLE_IS_FETCHING": {
      return {...state, isFetching: action.isFetching}
    }
    case "SN/USERS/SET_FILTER": {
      return {...state, filter: action.payload}
    }
    case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state, 
        followingInProgress:action.isFetching 
        ? [...state.followingInProgress, action.userId]
        : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    default:
      return state;
  }
};

export const actions = {
  followSuccess: (userId: number) => ({ type: "SN/USERS/FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "SN/USERS/UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: "SN/USERS/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) => ({ type: "SN/USERS/SET_CURRENT_PAGE", currentPage } as const),
  setFilter: (filter: FilterType) => ({ type: "SN/USERS/SET_FILTER", payload: filter } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: "SN/USERS/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const)
}

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));
    const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
      dispatch(actions.toggleIsFetching(false));
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};
export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await usersAPI.follow(userId)
      if (data.resultCode === 0) {
        dispatch(actions.followSuccess(userId));
      }
      dispatch(actions.toggleFollowingProgress(false, userId));
  };
};
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await usersAPI.unfollow(userId)
      if (data.resultCode === 0) {
        dispatch(actions.unfollowSuccess(userId));
      }
      dispatch(actions.toggleFollowingProgress(false, userId));
  };
};
export default usersReducer;

export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>


