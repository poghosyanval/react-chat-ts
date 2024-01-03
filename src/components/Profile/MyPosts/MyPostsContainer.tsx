import {actions} from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPost';
import { connect } from 'react-redux';

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}

let MyPostsContainer = connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps,{
  addPost: actions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer;