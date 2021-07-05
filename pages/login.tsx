import LoginForm from '../components/login-form';
import React, { useEffect, useState } from 'react';
import {useAuth} from '../firebase/auth'

//import {Image} from "next/image"
const Login = (_props) => {

  const { user } = useAuth();


  return (
      <div className="page-gradient root">
        <div className="slim-container centre-translate">
          {/*<Image className="page-logo" src="/assets/logo.png" alt="Worktap Logo"/>*/}
          <LoginForm></LoginForm>
        </div>
      </div>
    )
  }
export default Login;