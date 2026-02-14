import { MainBanner } from "./MainBanner";
import { SideBanner } from "./SideBanner";

import { useBannersQuery } from "@/features/products/hooks/banner.hook";
import type { CreateBannerInput } from "@/features/products/schemas/banner.schema";
import { Loader_Skeleton } from "./skeletons/Loader_Skeleton";

export default function HeroSection() {
  const { banners, isBannersLoading, isBannersError } = useBannersQuery();

  if (isBannersError) return <div>Something went wrong...</div>;

  const mainBanner: CreateBannerInput = banners[0];
  const sideBanners = banners.slice(1);

  return (
    <section className="w-full pt-10">
      {isBannersLoading ? (
        <Loader_Skeleton />
      ) : (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          <MainBanner banner={mainBanner} />
          {sideBanners.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {sideBanners.map((banner: CreateBannerInput) => {
                return (
                  <SideBanner
                    key={banner.title}
                    title={banner.title}
                    description={banner.description ?? ""}
                    linkUrl={banner.linkUrl ?? "#"}
                    imageUrl={banner.imageUrl}
                    gradient="from-gray-900 to-gray-700"
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
