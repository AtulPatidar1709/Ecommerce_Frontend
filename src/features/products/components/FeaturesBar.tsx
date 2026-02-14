import { features } from "../lib/feactureData";

export function FeaturesBar() {
  return (
    <section className="w-full mt-2 bg-gradient-to-r from-sky-50 via-white to-pink-50 rounded-xl border">
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-2 px-4"
          >
            <feature.icon className="h-7 w-7 text-sky-500" />
            <h3 className="text-sm font-semibold tracking-wide">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
