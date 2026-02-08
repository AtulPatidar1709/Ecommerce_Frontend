import { nameField, phoneField } from "@/types/common/fields.schema";
import { z } from "zod";

export const createAddressSchema = z.object({
  id: z.uuid("Invalid address ID format").optional(),
  name: nameField,
  phone: phoneField,
  street: z.string().min(3, "Street address is required").toLowerCase(),
  city: z.string().min(2, "City is required").toLowerCase(),
  state: z.string().min(2, "State is required").toLowerCase(),
  pincode: z
    .string()
    .min(5, "Pincode must be at least 5 digits")
    .regex(/^\d+$/, "Pincode must contain only digits"),
  country: z.string().min(2, "Country is required").toUpperCase(),
});

export const updateAddressSchema = createAddressSchema.partial();

export const getAddressSchema = z.object({
  addressId: z.uuid("Invalid address ID format"),
});

export type CreateAddressInputType = z.infer<typeof createAddressSchema>;
export type UpdateAddressInputType = z.infer<typeof updateAddressSchema>;
export type GetAddressInputIdType = z.infer<typeof getAddressSchema>;
