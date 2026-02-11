import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { UserLayout } from "./user.routes";
import { AuthLayout } from "./login.routes";
import { RouteGuard } from "./guards";
import Home from "@/pages/Home";
import { Loader_Skeleton } from "@/components/skeletons/Loader_Skeleton";

const Login = lazy(() => import("@/features/auth/pages/Login"));
const SignUp = lazy(() => import("@/features/auth/pages/SignUp"));
const VerifyOtp = lazy(() => import("@/features/auth/pages/VerifyOtp"));
const ProductDetails = lazy(
  () => import("@/features/products/pages/ProductDetails"),
);
const Products = lazy(() => import("@/features/products/pages/Products"));
const Addresses = lazy(() => import("@/features/address/pages/Addresses"));
const CartPage = lazy(() => import("@/features/cart/pages/Cart"));
const OrdersPage = lazy(() => import("@/features/orders/pages/Orders"));
const OrderDetailsPage = lazy(
  () => import("@/features/orders/pages/OrderDetails"),
);
const NotFoundPage = lazy(() => import("@/components/NotFoundPage"));

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
        element: (
          <Suspense fallback={<Loader_Skeleton />}>
            {" "}
            <ProductDetails />{" "}
          </Suspense>
        ),
      },
      {
        path: "/products/",
        element: (
          <Suspense fallback={<Loader_Skeleton />}>
            {" "}
            <Products />{" "}
          </Suspense>
        ),
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
          {
            path: "/login",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <Login />{" "}
              </Suspense>
            ),
          },
          {
            path: "/signup",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <SignUp />{" "}
              </Suspense>
            ),
          },
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
        children: [
          {
            path: "/verify-otp",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <VerifyOtp />{" "}
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  /* ================= 🚪 Login - Verified ================= */
  {
    element: <RouteGuard auth verified />,
    path: "/",
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: "/addresses",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <Addresses />{" "}
              </Suspense>
            ),
          },
          {
            path: "/cart",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <CartPage />{" "}
              </Suspense>
            ),
          },
          {
            path: "/orders",
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={<Loader_Skeleton />}>
                    {" "}
                    <OrdersPage />{" "}
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<Loader_Skeleton />}>
                    {" "}
                    <OrderDetailsPage />{" "}
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },

  /* ================= ❌ FALLBACK ================= */
  {
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader_Skeleton />}>
            {" "}
            <NotFoundPage />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);
