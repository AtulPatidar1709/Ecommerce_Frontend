import { z } from "zod";
import { orderStatusSchema } from "@/types/common/fields.schema";

/* ===================== QUERY SCHEMAS ===================== */
export const getOrdersQuerySchema = z.object({
  page: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1))
    .optional()
    .default(1),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(100))
    .optional()
    .default(10),
  status: orderStatusSchema.optional(),
  sortBy: z.enum(["createdAt", "totalAmount"]).optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const getOrderByIdSchema = z.object({
  id: z.string().uuid("Invalid order ID"),
});

/* ===================== NESTED SCHEMAS ===================== */

// Product image
export const ProductImageSchema = z.object({
  publicId: z.string(),
});

// Product
export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  discountPrice: z.number().optional(),
  images: z.array(ProductImageSchema),
  image: z
    .object({
      url: z.string(),
    })
    .optional(),
});

// Order item (detailed)
export const OrderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  price: z.number().optional(),
  discountPrice: z.number().optional(),
  quantity: z.number(),
  product: ProductSchema,
});

// Order item for summary (all orders)
export const AllOrdersOrderItemSchema = z.object({
  product: z.object({
    id: z.string(),
  }),
});

// Address
export const AddressSchema = z.object({
  id: z.string(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});

// Payment
export const PaymentSchema = z.object({
  status: z.string(),
  method: z.string().optional(),
  paymentMethod: z.string().optional(),
  amount: z.number().optional(),
});

/* ===================== RESPONSE SCHEMAS ===================== */
export const getOrderResponseSchema = z.object({
  id: z.string(),
  status: orderStatusSchema,
  totalAmount: z.number(),
  createdAt: z.string(),
  orderItems: z.array(AllOrdersOrderItemSchema),
  address: z.object({
    id: z.string(),
  }),
});

// All orders (summary)
export const getOrdersResponseSchema = z.array(getOrderResponseSchema);

// Single order (detailed)
export const getOrderByIdResponseSchema = z.object({
  success: z.boolean(),
  orderDetails: z.object({
    id: z.string(),
    userId: z.string(),
    addressId: z.string(),
    couponId: z.string().nullable(),
    totalAmount: z.number(),
    discountAmount: z.number(),
    status: orderStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
    orderItems: z.array(OrderItemSchema),
    payment: PaymentSchema.nullable(),
  }),
});

/* ===================== INPUT SCHEMAS ===================== */
export const createOrderSchema = z.object({
  addressId: z.string().min(1, "Invalid address ID"),
  couponId: z.string().optional(),
  paymentMethod: z.enum(["COD", "RAZORPAY"]).default("COD"),
});

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
});

/* ===================== TYPES ===================== */
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderSummary = z.infer<typeof getOrdersResponseSchema>[number];
export type OrderDetails = z.infer<
  typeof getOrderByIdResponseSchema
>["orderDetails"];
export type OrderAddress = z.infer<typeof AddressSchema>;

export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>;
export type GetOrderByIdInput = z.infer<typeof getOrderByIdSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
