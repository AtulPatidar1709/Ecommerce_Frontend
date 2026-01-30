import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import boatImg from "../../public/banner-images/boat.png";

export function MainBanner() {
  return (
    <Card className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-full bg-linear-to-r from-blue-600 to-cyan-500 p-6 md:p-10 flex flex-col justify-center">
        <p className="text-sm uppercase tracking-wide text-white/80">
          HeadPhones
        </p>
        <h1 className="mt-2 text-2xl md:text-4xl font-bold text-white">
          Head Phones
        </h1>
        <p className="mt-2 max-w-md text-white/90">
          Controll Your Mood with Wireless Sound.
        </p>
        <Button className="mt-4 w-fit bg-white text-blue-600 hover:bg-white/90">
          Shop Now
        </Button>
        <img
          src={boatImg}
          alt="HeadPhones"
          className="absolute hidden md:block right-4 bottom-4 w-40 md:w-64 lg:w-80 drop-shadow-xl"
        />
      </div>
    </Card>
  );
}
