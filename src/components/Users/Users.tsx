import React, { FC, useEffect } from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, getUsers,follow,unfollow } from '../../redux/usersReducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getStateUsers, getTotalUsersCount, getUsersFilter } from '../../redux/usersSelector';
import { AppDispatch } from '../../redux/reduxStore';
import { useSearchParams } from 'react-router-dom';
// import { follow,unfollow } from '../../redux/usersReducer';
type PropsType = { 
}

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getStateUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    
    const dispatch: AppDispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()


   useEffect(() => {

      const result: any = {}
      // @ts-ignore
      for (const [key, value] of searchParams.entries()) {
         let value2: any = +value
         if (isNaN(value2)) {
            value2 = value
         }
         if (value === 'true') {
            value2 = true
         } else if (value === 'false') {
            value2 = false
         }
         result[key] = value2
      }

      let actualPage = result.page || currentPage
      let term = result.term || filter.term

      let friend = result.friend || filter.friend
      if (result.friend === false) {
         friend = result.friend
      }

      const actualFilter = {friend, term}

      dispatch(getUsers(actualPage, pageSize, actualFilter))

      // eslint-disable-next-line
   }, [])


   useEffect(() => {

      const term = filter.term
      const friend = filter.friend

      let urlQuery =
         (term === '' ? '' : `&term=${term}`)
         + (friend === null ? '' : `&friend=${friend}`)
         + (currentPage === 1 ? '' : `&page=${currentPage}`)

      setSearchParams(urlQuery)

      // eslint-disable-next-line
   }, [filter, currentPage])
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber,pageSize,filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const followTransit = (userId:number) =>{
        dispatch(follow(userId));
    }
    const unfollowTransit = (userId:number) =>{
        dispatch(unfollow(userId));
    }
    return <div>
        <UsersSearchForm onFilterChanged = {onFilterChanged} />

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={followingInProgress}
                    key={u.id}
                    unfollow={unfollowTransit}
                    follow={followTransit}
                />
                )
            }
        </div>
    </div>
}
