import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const UserLayout = () => (
  <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-sky-50 via-white to-pink-50">
    <Header />

    <main className="flex-1 pt-14 px-3 rounded-sm md:px-8 lg:px-12">
      <Outlet />
    </main>

    <Footer />
  </div>
);
