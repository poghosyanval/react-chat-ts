import React from "react";
import { FilterType, follow, getUsers, unfollow } from "../../redux/usersReducer";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getStateUsers, getTotalUsersCount, getUsersFilter} from "../../redux/usersSelector";
import Preloader from "../Common/Preloader/Preloader";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";
import { Users } from "./Users";

type UsersPagePropsType = {
    pageTitle: string,
}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
            <h2>{props.pageTitle}</h2>
            {isFetching ?
                <Preloader /> : null}
            <Users />
        </>
}