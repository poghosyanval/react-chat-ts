import React from 'react'
import s from './Post.module.css'

type PropsType = {
  message: string,
  likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://cdn.landesa.org/wp-content/uploads/default-user-image.png' />
      {props.message}
      <div>
      <span>
        like {props.likesCount}
      </span>
      </div>
    </div>
  );
}

export default Post