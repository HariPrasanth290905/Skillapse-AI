import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {

  const [user,setUser] = useState({
    name:'',
    password:''
  });

  const navigate = useNavigate();
  return (
    <div id="signin">
      <div className="box">
        <div className="header">
          <img src="/logo.svg" alt="logo" />
          <h1>Welcome to Skillapse</h1>
          <p>Sign in to continue</p>
        </div>
        <div className="google">Google</div>
        <form className="up-enter">
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={user.name}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" 
            value={user.password}
            onChange={setUser}
            />
          </div>
        </form>
        <div className="sign-wrap">
          <button type="submit" className="myButton">
            Sign in
          </button>
          <div className="sign-foot">
            <p>Forgot password?</p>
            <p>
              Need an account?
              <a onClick={()=>{navigate('/signup')}} className="text-gray-300 hover:text-white mx-0.5 cursor-pointer">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
