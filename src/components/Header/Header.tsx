import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

export type MapPropsType = {
  isAuth: boolean,
  login: string | null,
}
export type DispatchPropsType = {
  logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
        <img src='https://www.freepnglogos.com/uploads/logo-website-png/logo-website-file-globe-icon-svg-wikimedia-commons-21.png'/>
        <div className={s.loginBlock}>
          {props.isAuth 
          ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
          : <NavLink to={'/login'}>Login</NavLink>}
        </div>
      </header>
  )
}

export default Header