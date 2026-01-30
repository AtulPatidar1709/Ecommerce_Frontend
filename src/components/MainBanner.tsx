import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MainBanner() {
  return (
    <Card className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-full bg-linear-to-r from-blue-600 to-cyan-500 p-6 md:p-10 flex flex-col justify-center">
        <p className="text-sm uppercase tracking-wide text-white/80">
          Gaming Gear
        </p>
        <h1 className="mt-2 text-2xl md:text-4xl font-bold text-white">
          Game Controller
        </h1>
        <p className="mt-2 max-w-md text-white/90">
          Controller type: Wireless controller
        </p>
        <Button className="mt-4 w-fit bg-white text-blue-600 hover:bg-white/90">
          Shop Now
        </Button>

        <img
          src="/controller.png"
          alt="Game Controller"
          className="absolute right-4 bottom-4 w-40 md:w-64 lg:w-80 drop-shadow-xl"
        />
      </div>
    </Card>
  );
}
