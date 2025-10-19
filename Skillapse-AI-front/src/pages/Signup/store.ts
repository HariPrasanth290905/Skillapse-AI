import type {formTypes} from "@/pages/Signup/formfields.ts";
import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

type SignupState = Partial<formTypes> & {
    setData: (data: Partial<formTypes>) => void;
}

export const useSignupStore = create<SignupState>()(
    persist(
        (set) => ({
            setData: (data) => set(data),
        }),
        {
            name: "onboarding-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)