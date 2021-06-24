import React, {useState} from 'react';
import {firebaseClient} from "../firebase/firebaseClient"
import firebase from "firebase"

const Login = () => {

    const [error, setError] = useState('');
    /*
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
async function handleSubmit(event) {
    event.preventDefault();
    setPassword(event.target.password.value)
    await firebaseClient.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        
        //console.log(user)
        window.location.href = '/';
    }).catch(function(error) {
        setError(error.message  );
        console.log(error);
    });
}*/

    let provider = new firebase.auth.GoogleAuthProvider()
    const handleGoogle  = () => {
        firebaseClient.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          window.location.href = "/"
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorCode + " " + errorMessage)
          // ...
        });
      }


    return ( 

        <button className="small-form-row form-button" onClick={handleGoogle}>Sign in with google!</button>
    );
}
export default Login;
        {/*}
        <form onSubmit={handleSubmit}>
            <div className="small-form-row">
                <div className="form-icon-container"><FontAwesomeIcon className="centre-translate form-icon" icon={faUser} /></div>
                <input placeholder="Email" className="form-input" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="small-form-row">
                <div className="form-icon-container"><FontAwesomeIcon className="centre-translate form-icon" icon={faKey} /></div>
                <input placeholder="Password" className="form-input" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {error ? error : null}
            <button className="small-form-row form-button" type="submit">Login</button>
                
            <p className="login-signin-option">Don't have an account? <strong><Link href="../register"><a>Sign Up Now</a></Link></strong></p>
            <a className="login-signin-option forgot-password" href="#">Forgot Password?</a>
            </form>
        */}