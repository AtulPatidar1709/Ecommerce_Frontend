import {
  emailField,
  nameField,
  passField,
  phoneField,
} from "@/types/common/fields.schema";
import { z } from "zod";

/* ================= LOGIN ================= */
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

/* ================= REGISTER ================= */
export const registerSchema = z.object({
  name: nameField,
  email: emailField,
  password: passField,
  confirmPassword: passField,
  phone: phoneField,
});

export type RegisterInput = z.infer<typeof registerSchema>;

/* ================= OTP ================= */
export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type OtpInput = z.infer<typeof otpSchema>;
