/**
 * Standard image sizes used across the app
 * (UI-driven, not backend-driven)
 */
export const IMAGE_SIZE = {
  ICON: 80, // category icons
  THUMB: 120, // small thumbnails
  GRID: 240, // product cards
  DETAIL: 480, // product detail page
  HERO: 600, // hero / banner images
} as const;

type ImageSizeKey = keyof typeof IMAGE_SIZE;

type CloudinaryOptions = {
  size?: ImageSizeKey;
  width?: number;
  height?: number;
  crop?: "contain" | "cover" | "fill";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif";
};

export const cloudinaryUrl = (
  publicId: string,
  options: CloudinaryOptions = {},
) => {
  const width =
    options.width ?? (options.size ? IMAGE_SIZE[options.size] : undefined);

  const height = options.height ?? width;
  const quality = options.quality ?? "auto";
  const format = options.format ?? "auto";

  if (!width) {
    throw new Error("cloudinaryUrl requires width or size");
  }

  return `${import.meta.env.VITE_CLOUDINARY_BASE}/w_${width},h_${height},f_${format},q_${quality}/${publicId}`;
};
