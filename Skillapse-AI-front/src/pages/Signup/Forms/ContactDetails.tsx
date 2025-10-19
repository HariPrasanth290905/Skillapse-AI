import {useForm, type SubmitHandler} from "react-hook-form";
import {formFields} from "../formfields";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useSignupStore} from "@/pages/Signup/store.ts";
import {useEffect} from "react";
import {signUpRequest} from "@/api/Profile.tsx";

const contactDetailsSchema = formFields.pick({
    contact: true,
    aboutMe: true
})

function ContactDetails() {
    const navigate = useNavigate();
    const store = useSignupStore();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(contactDetailsSchema),
        defaultValues: {
            contact: store.contact || {
                address: {
                    city: '',
                    country: '',
                    line1: '',
                    line2: '',
                    postalCode: '',
                    state: ''
                },
                phone: ''
            },
            aboutMe: store.aboutMe || '',
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof contactDetailsSchema>> = (data) => {

        const fullName = `${store.firstName || ''} ${store.lastName || ''}`.trim();
        const fullAddress = [
            data.contact.address.line1,
            data.contact.address.line2,
            data.contact.address.city,
            data.contact.address.state,
            data.contact.address.postalCode,
            data.contact.address.country
        ].filter(Boolean).join(', ');

        const userDto = {
            username: store.username,
            password: store.password,
            email: store.email,
            fullName: fullName,
            position: store.position,
            contact: {
                phone: data.contact.phone,
                address: fullAddress
            },
            experience: store.experience ? parseInt(store.experience) : undefined,
            aboutMe: data.aboutMe
        };
        try {
            signUpRequest(userDto).then(response => {
                if (response.status === 201) {
                    navigate('/')
                } else {
                    throw new Error('Sign up failed', response.data)
                }
            })
        }
        catch (error: unknown) {
            console.error(error)
        }
        localStorage.removeItem('signup-storage');
    }

    useEffect(() => {
        if (!store.firstName || !store.position) {
            navigate('/form/personaldetails')
        }
    }, [store.firstName, store.position, navigate])

    return (
        <section id="sign">
            <form
                className="grid gap-4 place-items-center w-full box"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-10 w-full">

                    {/* Address Line 1 */}
                    <div className="gap">
                        <label htmlFor="address1">
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            id="address1"
                            placeholder="Enter your street address"
                            {...register("contact.address.line1")}
                        />
                        {errors.contact?.address?.line1?.message && (
                            <span className="text-red-500">{errors.contact.address.line1.message}</span>
                        )}
                    </div>

                    {/* Address Line 2 */}
                    <div className="gap">
                        <label htmlFor="address2">
                            Address Line 2 (Optional)
                        </label>
                        <input
                            type="text"
                            id="address2"
                            placeholder="Apartment, suite, etc."
                            {...register("contact.address.line2")}
                        />
                        {errors.contact?.address?.line2?.message && (
                            <span className="text-red-500">{errors.contact.address.line2.message}</span>
                        )}
                    </div>

                    {/* City and Postal Code */}
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="gap">
                            <label htmlFor="city">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter your city"
                                {...register("contact.address.city")}
                            />
                            {errors.contact?.address?.city?.message && (
                                <span className="text-red-500">{errors.contact.address.city.message}</span>
                            )}
                        </div>

                        <div className="gap">
                            <label htmlFor="postalCode">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                placeholder="Enter your postal code"
                                {...register("contact.address.postalCode")}
                            />
                            {errors.contact?.address?.postalCode?.message && (
                                <span className="text-red-500">{errors.contact.address.postalCode.message}</span>
                            )}
                        </div>
                    </div>

                    {/* State and Country */}
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="gap">
                            <label htmlFor="state">
                                State/Region (Optional)
                            </label>
                            <input
                                type="text"
                                id="state"
                                placeholder="Enter your state/region"
                                {...register("contact.address.state")}
                            />
                            {errors.contact?.address?.state?.message && (
                                <span className="text-red-500">{errors.contact.address.state.message}</span>
                            )}
                        </div>

                        <div className="gap">
                            <label htmlFor="country">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                placeholder="Enter your country"
                                {...register("contact.address.country")}
                            />
                            {errors.contact?.address?.country?.message && (
                                <span className="text-red-500">{errors.contact.address.country.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Phone Number  */}
                    <div className="gap">
                        <label htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter your phone number"
                            {...register("contact.phone")}
                        />
                        {errors.contact?.phone?.message && (
                            <span className="text-red-500">{errors.contact.phone.message}</span>
                        )}
                    </div>
                    {/* About Me */}
                    <div className="gap">
                        <label htmlFor="aboutMe">
                            About Me
                        </label>
                        <textarea
                            id="aboutMe"
                            placeholder="Tell us about yourself"
                            {...register("aboutMe")}
                            className="min-h-[100px] border-gray-500 border rounded p-4"
                        />
                        {errors.aboutMe?.message && (
                            <span className="text-red-500">{errors.aboutMe.message}</span>
                        )}
                    </div>
                </div>
                {/* Button  */}
                <button className="myButton" type="submit">
                    Next
                </button>
                {errors.root?.message && (
                    <span className="text-red-500">{errors.root.message}</span>
                )}
            </form>

        </section>
    );
}

export default ContactDetails;