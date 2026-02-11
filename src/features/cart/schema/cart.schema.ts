import { z } from "zod";

export const CartItemSchema = z.object({
  id: z.string(),
  product: z.object({
    title: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    images: z.array(
      z.object({
        imageUrl: z.string().url(),
      }),
    ),
  }),
  productId: z.string(),
  quantity: z.number().min(1),
  subtotal: z.number(),
});

export const CartItemPropsSchema = z.object({
  item: CartItemSchema,
  onIncrease: z.custom<() => void>(),
  onDecrease: z.custom<() => void>(),
  onRemove: z.custom<() => void>(),
  isLoading: z.boolean(),
});

/* ===================== TYPES ===================== */
export type CartItemTypes = z.infer<typeof CartItemSchema>;
export type CartItemProps = z.infer<typeof CartItemPropsSchema>;
