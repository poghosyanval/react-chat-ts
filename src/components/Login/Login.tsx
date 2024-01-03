import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { GetStringKeys, Input, } from '../Common/FormsControls/FormControls'
import { required } from '../../utils/validator/validators'
import { login } from '../../redux/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import style from '../Common/FormsControls/FormsControls.module.css'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit,error,captchaUrl}) => {
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field placeholder='Email' name='email' validate={[required]} component={Input}/>
        </div>
        <div>
        <Field placeholder='Password' name='password' validate={[required]} component={Input} type='password'/>
        </div>
        <div>
          <Field type="checkbox" name='rememberMe' component={Input}/> remember me
        </div>
        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && <div>
          <Field placeholder='Symbols from image' type="input" validate={[required]} name='captcha' component={Input}/>
        </div>}
        {error && <div className={style.formSummeryError}>
          {error}
        </div>}
        <div>
          <button>Login</button>
        </div>
      </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({form: "login"})(LoginForm)

export type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string,
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
const dispatch:AppDispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email,formData.password,formData.rememberMe,formData.captcha));
  }
  if(isAuth){
    return <Navigate to={"/profile"}/>
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
}