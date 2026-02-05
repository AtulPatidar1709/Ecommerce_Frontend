import { useQuery } from "@tanstack/react-query";
import { bannerApiEndpoints } from "../api/banner.api";
import type { CreateBannerInput } from "../schemas/banner.schema";

export const useBannerDetails = (id: string) => {
  const bannerDetails = useQuery({
    queryKey: ["banner", id],
    queryFn: () => bannerApiEndpoints.getBannerById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 1000 * 20,
    retry: false,
  });

  return {
    bannerDetails: bannerDetails.data ?? {},
    bannerIsLoading: bannerDetails.isLoading,
    bannerError: bannerDetails.isError,
  };
};

export const useBannersQuery = () => {
  const query = useQuery({
    queryKey: ["banners"],
    queryFn: () => bannerApiEndpoints.getActiveBanners(),
    retry: false,
    placeholderData: (previousData: CreateBannerInput) => previousData,
    refetchOnWindowFocus: false,
  });

  return {
    banners: query.data ?? [],
    isBannersLoading: query.isLoading,
    isBannersError: query.isError,
  };
};
