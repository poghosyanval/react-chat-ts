import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../redux/reduxStore";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
	isAuth: state.auth.isAuth
} as MapPropsType)

type MapPropsType = {
	isAuth: boolean,
	router: any
}
type DispatchPropsType = {
}

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes> (WrappedComponent: React.ComponentType<WCP>) {
	const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
		let {isAuth, ...restProps} = props
			if(isAuth){
				return <WrappedComponent {...restProps as unknown as WCP}/>
			}else if(!isAuth && !restProps.router){
				return <Navigate to='/login'/>
			}else {
				if(!isAuth && !restProps.router.params.userId){
					return <Navigate to='/login'/>
				} else {
					if(!isAuth && restProps.router.params.userId) return <WrappedComponent {...restProps as unknown as WCP}/>
				}
		}
	}
	return compose(connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {}))((RedirectComponent));
}