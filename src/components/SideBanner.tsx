import { Card, CardContent } from "@/components/ui/card";
import type { CreateBannerInput } from "@/features/products/schemas/banner.schema";
import { Link } from "react-router-dom";

export function SideBanner({
  title,
  description,
  linkUrl,
  gradient,
  imageUrl,
}: CreateBannerInput & { gradient: string }) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg">
      <CardContent
        className={`relative flex h-full flex-col justify-between bg-gradient-to-br ${gradient} p-6`}
      >
        {/* Text */}
        <div className="z-10">
          <p className="text-sm uppercase tracking-wide text-white/80">
            {description}
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>

          <Link
            to={linkUrl || "#"}
            className="mt-3 inline-block text-sm font-medium text-white underline-offset-4 hover:underline"
          >
            Shop Now →
          </Link>
        </div>

        {/* Image */}
        <div className="pointer-events-none absolute bottom-3 right-3">
          <img
            src={imageUrl}
            alt={title}
            className="
              max-h-24
              w-auto
              object-contain
              drop-shadow-xl
              transition-transform
              duration-300
              group-hover:scale-105
            "
            width={600}
            height={600}
          />
        </div>
      </CardContent>
    </Card>
  );
}
