import { axiosApi } from "@/lib/axiosApi";

export const bannerApiEndpoints = {
  getActiveBanners: () =>
    axiosApi.get("/banners/active").then((res) => res.data.banners),
  getBannerById: (id: string) =>
    axiosApi.get(`/banners/${id}`).then((res) => res.data.banner),
  getAllBanners: () =>
    axiosApi.get("/banners/").then((res) => res.data.banners),
  createBanner: (formData: FormData) => {
    return axiosApi
      .post("/banners/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.banner);
  },
};
