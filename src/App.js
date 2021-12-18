import { connect } from "react-redux";
import "./App.css"
import React from "react";
import GoogleLogin from 'react-google-login';
import {getUser,signUp,loginUser} from "./utility/utility"
import Cookies from "js-cookie";

function Alert({error,setError}){
  return <div className={`alert ${error && 'alert_enable'}`}>
    <button className="popup-close" onClick={()=>setError(null)}>X</button>
    <span>{error}</span>
  </div>
}
function App({user,setUser}){

  const [error,setError] = React.useState(null);

  React.useEffect(()=>{
    if(Cookies.get('token')){
      getUser().then((user)=>{
        setUser(user);
      }).catch((e)=>{
        console.log(e);
      })
    }
  },[])

  const responseLogin = (response) => {
    const {email} = response.profileObj;
    loginUser(email).
    then((response)=>{
      const {token,error} = response;
      if(error){
        setError(error);
      }
      if(token){
        Cookies.set("token",token);
        window.location.reload();
      }
    }).catch((e)=>{
      console.log(e);
    })
  }
  const responseSignup = (response) => {
    const {name,email,googleId,imageUrl} = response.profileObj;
    signUp(name,email,googleId,imageUrl).
    then((response)=>{
      console.log(response);
      const {token,error} = response;
      if(error){
        setError(error);
      }
      if(token){
        Cookies.set("token",token);
        window.location.reload();
      }
    }).catch((e)=>{
      console.log(e);
    })
  }

  
  return (
    <div className="auth">
      <Alert error={error} setError={setError}/>
      <>{!user?<div className="non_auth">
        <h1>Login</h1>

        <GoogleLogin
    clientId="362228159545-9csvldd18ruffk7n2dcdum30ajolv0q9.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} className="google_login_btn">Sign in with Google</button>
    )}
    buttonText="Login"
    onSuccess={responseLogin}
    onFailure={responseLogin}
    cookiePolicy={'single_host_origin'}
  />

  <h1>Signup</h1>
  <GoogleLogin
    clientId="362228159545-9csvldd18ruffk7n2dcdum30ajolv0q9.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} className="google_login_btn">Sign up with Google</button>
    )}
    buttonText="SignUp"
    onSuccess={responseSignup}
    onFailure={responseSignup}
    cookiePolicy={'single_host_origin'}
  />
  
      </div>:
      <div className="authenticated">
        <h1>{user.name}</h1>
       <div className="user_avatar">
         <img src={user.avatar} alt="user_avatar"/>
       </div>
        <button className="logout_btn" onClick={()=>{
          Cookies.remove("token");
          setUser(null);
        }}>Logout</button>
      </div>}
      </>
    </div>
  )
}

const mapStateToProps = (state)=>({
  user:state.appReducer.user
})

const mapDispatchToProps = (dispatch)=>({
  setUser: (user)=>dispatch({type:"SET_USER", user})
})
export default connect(mapStateToProps,mapDispatchToProps)(App);