import { z } from "zod";

export const ImageSchema = z.object({
  imageUrl: z.string(),
  isPrimary: z.boolean(),
});

export const ProductSectionSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  brand: z.string(),
  title: z.string(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  images: ImageSchema.array(),
  discountPrice: z.number().nonnegative().default(0),
});

export const CategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export const ProductDetailsSchema = ProductSectionSchema.extend({
  description: z.string(),
  category: CategorySchema.optional(),
});

export type ImageTypes = z.infer<typeof ImageSchema>;
export type ProductTypes = z.infer<typeof ProductSectionSchema>;
export type ProductDetailsTypes = z.infer<typeof ProductDetailsSchema>;
