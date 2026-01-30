import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";

export const UserLayout = () => (
  <div className="min-h-screen w-full">
    <Header />
    <main className="flex-1 pt-14 px-3 rounded-sm md:px-8 lg:px-12">
      <Outlet />
    </main>
  </div>
);
