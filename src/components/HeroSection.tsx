import { MainBanner } from "./MainBanner";
import { SideBanner } from "./SideBanner";

import boatImg from "../../public/banner-images/boat.png";

export default function HeroSection() {
  return (
    <section className="w-full pt-10">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <MainBanner />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          <SideBanner
            title="Bamboo Buds"
            label="New Arrival"
            gradient="from-purple-600 to-pink-500"
            image={boatImg}
          />
          <SideBanner
            title="HomePod Pro"
            label="New Arrival"
            gradient="from-gray-900 to-gray-700"
            image={boatImg}
          />
        </div>
      </div>
    </section>
  );
}
