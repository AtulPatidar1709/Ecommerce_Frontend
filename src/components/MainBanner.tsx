import { Card } from "@/components/ui/card";
import type { CreateBannerInput } from "@/features/products/schemas/banner.schema";
import { Link } from "react-router-dom";

export function MainBanner({ banner }: { banner: CreateBannerInput }) {
  const { title, description, linkUrl, imageUrl } = banner;

  return (
    <Card className="lg:col-span-2 overflow-hidden rounded-2xl shadow-lg">
      <div className="relative grid h-full grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-blue-600 to-cyan-500 p-6 md:p-10">
        {/* Text */}
        <div className="z-10 flex flex-col gap-3 md:col-span-2">
          <p className="text-sm uppercase tracking-wide text-white/80">
            {description}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white md:text-4xl">
            {title}
          </h1>

          <p className="mt-2 max-w-md text-white/90">{description}</p>

          <Link
            to={linkUrl || "#"}
            className="mt-4 w-fit rounded-xl bg-white px-4 py-2 text-blue-600 transition hover:bg-white/90"
          >
            Shop Now
          </Link>
        </div>

        {/* Image */}
        <div className="relative hidden md:flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="
              max-h-[260px]
              w-auto
              object-contain
              drop-shadow-2xl
              transition-transform
              duration-300
              hover:scale-105
            "
          />
        </div>
      </div>
    </Card>
  );
}
