import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div>
        <NavLink to='/profile' className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
      </div>
      <div>
        <NavLink to='/dialogs' className={navData => navData.isActive ? s.active : s.item}>Messages</NavLink>
      </div>
      <div>
        <NavLink to='/users' className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/news' className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/musics' className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/settings' className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
      </div>
    </nav>
  )
}

export default Navbar