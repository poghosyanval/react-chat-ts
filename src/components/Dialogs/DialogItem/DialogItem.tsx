import React from "react"
import { NavLink } from "react-router-dom"
import s from './../Dialogs.module.css'

type PropsType = {
  id: number,
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    const path = "/dialogs/" + props.id
    return (
      <div className={`${s.dialog} ${s.active}`}>
        <NavLink to={path}>
        <img src='https://cdn.landesa.org/wp-content/uploads/default-user-image.png' />
          {props.name}
          </NavLink>
      </div>
    )
  }
  export default DialogItem