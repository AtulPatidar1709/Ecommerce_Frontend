import { useState } from "react";
import type {
  ImageTypes,
  ProductDetailsTypes,
} from "../schemas/product.schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { ShoppingCart, Heart, ChevronRight, Home, Tag } from "lucide-react";
import { useProductDetails } from "../hooks/products.hook";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BsCart3 } from "react-icons/bs";
import { useUpdateCartItems } from "@/features/cart/hooks/cart.hook";
import CardSkeleton from "@/components/CardSkeleton";

const ProductDetails = () => {
  const { slug } = useParams();

  const { productDetails, productIsLoading, productError } = useProductDetails(
    slug!,
  );

  const { updateCartItemQuantity, isUpdating } = useUpdateCartItems();

  const [mainImage, setMainImage] = useState<string | null>(null);

  if (productIsLoading) return <CardSkeleton />;

  if (productError) return <div>Loading...</div>;

  const product: ProductDetailsTypes = productDetails;

  const selectedImage = mainImage ?? product.images[0].imageUrl ?? "";

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100,
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <Home className="size-4 stroke-2" />
                <span>Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="stroke-2" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/products"
                className="flex items-center gap-1"
              >
                <BsCart3 className="size-4 stroke-2" />
                <span>Products</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="stroke-2" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1">
                <Tag className="size-4 stroke-2" />
                <span>Category</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-4/3 bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img: ImageTypes, idx: number) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === img.imageUrl
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.imageUrl)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{product.brand}</span>
            {product.category && (
              <>
                <span className="text-gray-300">|</span>
                <span>{product.category.name}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-3">
            {product.discountPrice < product.price && (
              <span className="text-gray-500 line-through text-lg">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              ₹{product.discountPrice.toLocaleString("en-IN")}
            </span>

            {discountPercentage > 0 && (
              <Badge className="bg-red-600 text-white px-2 py-1 text-sm">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          <p
            className={`text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={() => updateCartItemQuantity(product.id, 1)}
              size="lg"
              className="flex-1 justify-center"
              disabled={product.stock === 0 || isUpdating}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
