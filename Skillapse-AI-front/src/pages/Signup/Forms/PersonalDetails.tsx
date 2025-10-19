import {useForm, type SubmitHandler} from "react-hook-form";
import {formFields} from "../formfields";
import {zodResolver} from "@hookform/resolvers/zod";
import type z from "zod";
import {useNavigate} from "react-router-dom";
import {useSignupStore} from "@/pages/Signup/store.ts";
import {useEffect} from "react";

const personalDetailsSchema = formFields.pick({
    firstName: true,
    lastName: true,
    position: true,
    experience: true
})

function PersonalDetails() {

    const navigate = useNavigate();

    const username = useSignupStore((state)=>state.username);
    const password = useSignupStore((state)=>state.password);
    const email = useSignupStore((state)=>state.email);

    const setData = useSignupStore((state) => state.setData);

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            position: '',
            experience: ''
        }
    })
    const onSubmit: SubmitHandler<z.infer<typeof personalDetailsSchema>> = (data) => {
        setData(data)
        navigate('/form/contactdetails')
    }

    useEffect(() => {
            if (!username || !password || !email) {
                navigate('/form/userdetails')
            }
        },
        [username, password, email, navigate, ])
    return (
        <section id="sign">
            <div className="box">
                <form
                    className="grid gap-4 place-items-center w-full"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-10 w-full">
                        {/* First Name and Last Name  */}
                        <div className="flex flex-col md:flex-row gap-10">
                            {/* First Name */}
                            <div className="flex flex-col min-h-[90px] md:min-h-[100px]">
                                <label htmlFor="firstname" className="mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    placeholder="Enter your firstname"
                                    {...register("firstName")}
                                />
                                {errors.firstName?.message && (
                                    <span className="text-red-500 text-sm mt-1">{errors.firstName.message}</span>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col min-h-[90px] md:min-h-[100px]">
                                <label htmlFor="lastname" className="mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    placeholder="Enter your lastname"
                                    {...register("lastName")}
                                />
                                {errors.lastName?.message && (
                                    <span className="text-red-500 text-sm mt-1">{errors.lastName.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Position & Experience  */}
                        <div className="grid gap-10">
                            {/* Position  */}
                            <div className="gap">
                                <label htmlFor="position">
                                    Position
                                </label>
                                <input type="text"
                                       id="position"
                                       placeholder="Enter your position"
                                       {...register("position")}
                                />
                                {errors.position?.message &&
                                    (<span className="text-red-500">{errors.position.message}</span>)}
                            </div>
                            {/* Experience */}
                            <div className="gap">
                                <label htmlFor="experience">
                                    Experience
                                </label>
                                <input
                                    id="experience"
                                    inputMode="numeric"
                                    placeholder="Enter your experience(Optional)"
                                    {...register("experience")}
                                    type="text"/>
                                {errors.experience?.message && (
                                    <span className="text-red-500">{errors.experience.message}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Button  */}
                    <button className="myButton"
                            type="submit"
                    >Next
                    </button>
                    {errors.root?.message &&
                        (<span className="text-red-500">{errors.root.message}</span>)}

                </form>
            </div>
        </section>
    )
}

export default PersonalDetails;