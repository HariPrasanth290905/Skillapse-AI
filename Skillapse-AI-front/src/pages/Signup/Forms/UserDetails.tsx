import {useForm, type SubmitHandler} from "react-hook-form";
import {formFields} from "../formfields";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useSignupStore} from "@/pages/Signup/store.ts";

const userDetailsSchema = formFields.pick({
    username: true,
    password: true,
    email: true
})

function UserDetails() {

    const navigate = useNavigate();
    const store = useSignupStore();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(userDetailsSchema),
        defaultValues: {
            username: store.username || '',
            password: store.password || '',
            email: store.email || ''
        }
    })
    const onSubmit: SubmitHandler<z.infer<typeof userDetailsSchema>> = (data) => {
        store.setData(data)
        navigate('/form/personaldetails')
    }

    return (
        <section id="sign">
            <div className="box">
                <div className="header">
                    <h1>Sign Up</h1>
                </div>
                <form className="up-enter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="gap-8 w-full flex flex-col">
                        <div className="gap">
                            <label htmlFor="username">
                                Username
                            </label>
                            <input type="text"
                                   id="username"
                                   placeholder="Enter your username"
                                   {...register("username")}
                            />
                        </div>
                        {errors.username?.message
                            && (<span className="text-red-500">{errors.username.message}</span>)}
                        <div className="gap">
                            <label htmlFor="email">
                                E-mail
                            </label>
                            <input type="email"
                                   id="email"
                                   placeholder="Enter your email"
                                   {...register("email")}
                            />
                        </div>
                        {errors.email?.message
                            && (<span className="text-red-500">{errors.email.message}</span>)}
                        <div className="gap">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                placeholder="Enter your password"
                                {...register("password")}
                                type="password"/>
                        </div>
                        {errors.password?.message
                            && (<span className="text-red-500">{errors.password.message}</span>)}
                    </div>
                    <button className="myButton"
                            type="submit"
                    >Next
                    </button>

                </form>
            </div>
        </section>
    )
}

export default UserDetails;