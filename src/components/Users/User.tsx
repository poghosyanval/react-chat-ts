import React from 'react';
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png';
import { NavLink } from "react-router-dom";
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,

}

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.large != null ? user.photos.large : userPhoto}
                            className={styles.userPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress
                            .some(id => id === user.id)}
                            onClick={() => { unfollow(user.id) }}>
                            Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { follow(user.id) }}>
                            Follow</button>}

                </div>
            </span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
        </div>)
}

export default User;