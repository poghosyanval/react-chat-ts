import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile,getStatus,updateStatus,savePhoto,saveProfile } from '../../redux/profileReducer';
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
}
type PathParamsType = {
    userId: string
    router: any
} 
type PropsType = MapPropsType & DispatchPropsType & PathParamsType

type LocalStateType = { isShowMyProfile: boolean }

class ProfileContainer extends React.Component<PropsType, LocalStateType> {
   constructor(props: PropsType) {
      super(props)
      this.state = {
         isShowMyProfile: true
      }
   }


   componentDidMount() {

      let userIdFromPath = +this.props.router.params.userId
      let authorisedUserId = this.props.authorisedUserId

      if (userIdFromPath) {
         this.props.getUserProfile(userIdFromPath)
         this.props.getStatus(userIdFromPath)

      } else {

         if (this.props.isAuth && authorisedUserId) {
            this.props.getUserProfile(authorisedUserId)
            this.props.getStatus(authorisedUserId)
         }
      }
   }

   componentDidUpdate(prevProps: PropsType & LocalStateType, prevState: PropsType & LocalStateType) {

      let userIdFromPath = +this.props.router.params.userId
      let authorisedUserId = this.props.authorisedUserId
      let isShowMyProfile = this.state.isShowMyProfile

      if (isShowMyProfile) {

         if (userIdFromPath === authorisedUserId) {
            this.setState({isShowMyProfile: false})
         }

         if (!userIdFromPath && this.props.isAuth && authorisedUserId) {
            this.props.getUserProfile(authorisedUserId)
            this.props.getStatus(authorisedUserId)
            this.setState({isShowMyProfile: false})
         }
      }
   }


   render() {

      if (!this.props.isAuth && !this.props.router.params.userId) {
         return <Navigate to={'/login'} />
      }

      let userIdFromPath = +this.props.router.params.userId
      let authorisedUserId = this.props.authorisedUserId


      let isOwner = false
      if (!userIdFromPath && this.props.isAuth) {
         isOwner = true
      } else if (userIdFromPath === authorisedUserId) {
         isOwner = true
      }


      return (
         <div>
            <Profile
               profile={this.props.profile}
               status={this.props.status}
               updateStatus={this.props.updateStatus}
               isOwner={isOwner}
               savePhoto={this.props.savePhoto}
               saveProfile={this.props.saveProfile}
            />
         </div>
      )
   }
}

let mapStateToProps = (state: AppStateType) => {
    return({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.Id,
    isAuth: state.auth.isAuth
})
}

function withRouter(Component:any) {
    function ComponentWithRouterProp(props:any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile,getStatus,updateStatus,savePhoto,saveProfile}),
    withRouter
)(ProfileContainer)



