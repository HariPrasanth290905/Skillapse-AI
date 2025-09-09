import React from "react";

function Signup() {
  return (
    <div id="signup">
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
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
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
              <a
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-gray-300 hover:text-white mx-0.5"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
