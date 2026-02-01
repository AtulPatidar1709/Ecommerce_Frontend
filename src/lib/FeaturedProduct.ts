import type { ProductTypes } from "@/components/ProductCard";
import boatImg1 from "../../public/banner-images/boat.png";
import boatImg2 from "../../public/banner-images/boat.png";
import boatImg3 from "../../public/banner-images/boat.png";

export const productsData: ProductTypes[] = [
  {
    id: "boat-001",
    title: "Luxury Wooden Boat",
    description:
      "Handcrafted luxury wooden boat with premium finish, ideal for smooth and stylish water travel.",
    price: 12500,
    thumbnail: boatImg1,
    images: [boatImg1, boatImg2, boatImg3],
    discount: 10,
    stock: 12,
  },
  {
    id: "boat-002",
    title: "Speed Fishing Boat",
    description:
      "High-performance fishing boat designed for speed, stability, and long water journeys.",
    price: 9800,
    thumbnail: boatImg2,
    images: [boatImg2, boatImg1, boatImg3],
    discount: 5,
    stock: 8,
  },
  {
    id: "boat-003",
    title: "Family Travel Boat",
    description:
      "Spacious and safe family travel boat, perfect for leisure trips and calm river rides.",
    price: 15200,
    thumbnail: boatImg3,
    images: [boatImg3, boatImg1, boatImg2],
    discount: 12,
    stock: 5,
  },
  {
    id: "boat-004",
    title: "Adventure Motor Boat",
    description:
      "Powerful motor boat built for adventure seekers and high-speed water experiences.",
    price: 18000,
    thumbnail: boatImg1,
    images: [boatImg1, boatImg3, boatImg2],
    discount: 8,
    stock: 7,
  },
  {
    id: "boat-005",
    title: "Mini River Boat",
    description:
      "Compact and lightweight boat ideal for short river trips and narrow waterways.",
    price: 6400,
    thumbnail: boatImg2,
    images: [boatImg2, boatImg1],
    discount: 15,
    stock: 20,
  },
  {
    id: "boat-006",
    title: "Premium Yacht Boat",
    description:
      "Luxury yacht-style boat with premium interiors and smooth long-distance performance.",
    price: 25000,
    thumbnail: boatImg3,
    images: [boatImg3, boatImg2, boatImg1],
    discount: 18,
    stock: 3,
  },
];
