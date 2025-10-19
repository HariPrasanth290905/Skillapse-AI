
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginRequest } from "@/api/Profile";

const signIn = z.object({
  username: z.string()
    .min(4, "Username must be atleast 4 characters")
    .max(20, "Username should not exceed 20 characters"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
})
type SignInForm = z.infer<typeof signIn>

function Signin() {

  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm({
      resolver: zodResolver(signIn),
      defaultValues: {
        username: "",
        password: ""
      }
    });

  const handleSignIn: SubmitHandler<SignInForm> = async (data) => {
    try {
      const token: string = await loginRequest({
        username: data.username,
        password: data.password
      })
      sessionStorage.setItem("accessToken", token)
    } catch (error: unknown) {
      console.error('Sign in failed', error)
    }
  }

  return (
    <div id="sign">
      <div className="box">
        <div className="header">
          <img src="/logo.svg" alt="logo" />
          <h1>Welcome to Skillapse</h1>
          <p>Sign in to continue</p>
        </div>

        <form className="up-enter" 
        onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id='username'
              placeholder="Enter your username"
              {...register("username")}
            />
            {errors.username?.message &&
              (<span className="text-red-500">{errors.username.message}</span>)}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id='password'
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password?.message &&
              (<span className="text-red-500">{errors.password.message}</span>)}
          </div>

          <button className="myButton" type="submit">
            Sign In
          </button>
          {errors.root?.message &&
            (<span className='text-red-500'>{errors.root.message}</span>)}
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
