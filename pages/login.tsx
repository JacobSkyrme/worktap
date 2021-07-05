import LoginForm from '../components/login-form';
import React from 'react';
import {useAuth} from '../firebase/auth'
import useWindowDimensions from "../components/windowDimensions"

//import {Image} from "next/image"
const Login = (_props) => {

  const { user } = useAuth();
  const { height, width } = useWindowDimensions();



  return (
      <div className="page-gradient root" style={{width: width, height: height}}>
        <div className="slim-container centre-translate">
          {/*<Image className="page-logo" src="/assets/logo.png" alt="Worktap Logo"/>*/}
          <LoginForm></LoginForm>
        </div>
      </div>
    )
  }
export default Login;