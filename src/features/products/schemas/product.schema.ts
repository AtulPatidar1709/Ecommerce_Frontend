import { z } from "zod";

export interface FilterState {
  search: string;
  price: [number, number];
  brands: string[];
  ratings: number[];
}

export const getAllProductsQuerySchema = z.object({
  search: z.string().optional(),

  brand: z
    .string()
    .transform((v) => v.split(","))
    .optional(),

  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),

  rating: z.coerce.number().min(1).max(5).optional(),

  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),

  sort: z.enum(["price_asc", "price_desc", "latest"]).optional(),
});

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
export type GetAllProductsQueryInputType = z.infer<
  typeof getAllProductsQuerySchema
>;
