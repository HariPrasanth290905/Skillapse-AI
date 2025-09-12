import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(user);
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/signIn", user)
      .then((res) => {
        console.log(res.data);
        navigate("/verifyOtp", {
          replace: true,
          state: { email: res.data, username: user.username },
        });
      })
      .catch((err) => {
        console.error(err);
        // Show error to user
      });
  };

  // Google login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div id="signin">
      <div className="box">
        <div className="header">
          <img src="/logo.svg" alt="logo" />
          <h1>Welcome to Skillapse</h1>
          <p>Sign in to continue</p>
        </div>

        {/* Google login */}
        <div className="cursor-pointer" onClick={handleGoogleLogin}>
          Google
        </div>

        {/* Traditional login */}
        <form className="up-enter" onSubmit={handleSignin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button className="myButton" type="submit">
            Sign In
          </button>
        </form>
        <div className="sign-foot">
          <a href="#" className="sign-wrap">
            Forgot password?
          </a>
          <p>
            Need an account?
            <a href="#" className="sign-wrap">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
