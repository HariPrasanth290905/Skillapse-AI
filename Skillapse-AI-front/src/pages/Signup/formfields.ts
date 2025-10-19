import z from "zod";

export const formFields = z.object({
  // Account Information
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  email: z.email("Invalid email address"),

  // Personal Details
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().optional(),
  position: z.string().min(2, "Position must be at least 2 characters"),
  experience: z
    .string({
      error: "Enter a valid experience",
    })
    .min(0, "Experience cannot be negative")
    .max(50, "Experience seems too high"),

  // Step 3: Contact Information
  contact: z.object({
    phone: z
      .string()
      .regex(
        /^\+?[0-9]{7,15}$/,
        "Enter a valid phone number (with country code if needed)"
      ),

    address: z.object({
      line1: z
        .string({ error: "Enter your street address" })
        .min(3, "Enter a valid street address")
        .max(100, "Street address too long"),

      line2: z.string().max(100, "Address line 2 too long").optional(), // apartment, suite, etc.

      city: z
        .string({ error: "Enter your city" })
        .min(2, "Enter a valid city name")
        .max(50, "City name too long"),

      state: z
        .string()
        .min(2, "Enter a valid state or region")
        .max(50, "State name too long")
        .optional(), // optional for countries without states

      postalCode: z
        .string()
        .regex(
          /^(?!.*[ -]{2})[A-Za-z0-9][A-Za-z0-9\s\-]{2,10}$/,
          "Enter a valid postal or ZIP code"
        ),

      country: z
        .string({ error: "Enter your country" })
        .min(2, "Enter a valid country name")
        .max(56, "Country name too long"),
    }),
  }),
  // Step 4: Profile Summary
  aboutMe: z
    .string()
    .min(20, "Please write at least 20 characters about yourself")
    .max(500, "About me section too long"),
});

export type formTypes = z.infer<typeof formFields>;
