import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { UserLayout } from "./user.routes";
import { AuthLayout } from "./login.routes";
import { RouteGuard } from "./guards";
import Login from "@/features/auth/pages/Login";
import SignUp from "@/features/auth/pages/SignUp";
import VerifyOtp from "@/features/auth/pages/VerifyOtp";
import ProductDetails from "@/features/products/pages/ProductDetails";
import NotFoundPage from "@/components/NotFoundPage";
import Products from "@/features/products/pages/Products";

export const routerPaths = createBrowserRouter([
  /* ================= 🌍 PUBLIC ================= */
  {
    element: <UserLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/products/",
        element: <Products />,
      },
    ],
  },

  /* ================= 🚪 GUEST ================= */
  {
    element: <RouteGuard guestOnly />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> },
        ],
      },
    ],
  },

  /* ================= 🚪 Login - Not Verified ================= */
  {
    element: <RouteGuard auth />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ path: "/verify-otp", element: <VerifyOtp /> }],
      },
    ],
  },

  /* ================= ❌ FALLBACK ================= */
  {
    element: <AuthLayout />,
    children: [{ path: "*", element: <NotFoundPage /> }],
  },
]);
