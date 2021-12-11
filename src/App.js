import { connect } from "react-redux";
import "./App.css"
import GoogleLogin from 'react-google-login';
function App({user,setUser}){

  const responseGoogle = (response) => {
    console.log(response);
  }

  
  return (
    <div className="auth">

      <>{!user?<div className="non_auth">
        <h1>Login</h1>

        <GoogleLogin
    clientId="362228159545-9csvldd18ruffk7n2dcdum30ajolv0q9.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} className="google_login_btn">Sign in with Google</button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  
      </div>:
      <div className="authenticated">
        <h1>Username</h1>
        <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
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