import * as zod from "zod";

export const RegisterSchema = zod.object({
  name: zod
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  email: zod
    .string()
    .nonempty("Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is invalid"
    ),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
      "Password is invalid"
    ),
  age: zod
    .number({ invalid_type_error: "Age must be a number" })
    .int("Age must be an integer")
    .min(13, "Your age must be at least 13")
    .max(120, "Please enter a valid age"),
  phone: zod
    .string()
    .nonempty("Phone is required")
    .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Phone number is invalid"),
});
