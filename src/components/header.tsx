"use client";
import { Link } from "react-router-dom";
import { Menu, UserIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "motion/react";
import { Separator } from "@/components/ui/separator";
import logo from "../../public/logo.jpg";
import { useUserQuery } from "@/features/auth/hooks/auth.hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCartDetails } from "@/features/cart/hooks/cart.hook";
import { CartIcon } from "./CartIcon";

const menuItems = [
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const { user } = useUserQuery();

  const { allCartItems } = useCartDetails();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "fixed z-20 w-full h-14 border-b transition-colors duration-150",
          scrolled && "bg-background/50 backdrop-blur-xl",
        )}
      >
        <div className="px-3 h-full transition-all duration-300">
          <div className="relative flex h-full flex-wrap items-center justify-between gap-3 lg:gap-0">
            <div className="flex w-full h-full items-center justify-between gap-6 lg:w-auto">
              <Link
                to="/"
                aria-label="home"
                className="flex gap-2 -mr-3 whitespace-nowrap items-center"
              >
                <img
                  src={logo}
                  alt="Design Logo"
                  height={50}
                  width={50}
                  className="h-10 z-10 w-full hidden dark:block object-contain"
                />
                <img
                  src={logo}
                  alt="Design Logo"
                  height={50}
                  width={50}
                  className="h-10 z-10 w-full dark:hidden block object-contain"
                />
                Ecommerce
              </Link>

              <Separator className="hidden lg:block" orientation="vertical" />

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20  -m-2.5 mr-2 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-10 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background lg:h-14 in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Separator orientation="vertical" />
              <CartIcon count={allCartItems?.summary?.totalItems || 0} />
              <Separator orientation="vertical" />
              <div className="flex w-full mr-3 flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {!user && (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/login">
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/signup">
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                  </>
                )}

                {user && (
                  <React.Fragment>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="outline-none">
                          <Avatar className="h-8 w-8 cursor-pointer">
                            <AvatarImage
                              src={
                                user.profilePicture ??
                                `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`
                              }
                              alt={user.name}
                              className="grayscale"
                            />
                            <AvatarFallback>
                              {user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Link
                            to="/addresses"
                            className="flex items-center gap-2"
                          >
                            <UserIcon className="h-4 w-4" />
                            <span>Addresses</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Link
                            to="/orders"
                            className="flex items-center gap-2"
                          >
                            <UserIcon className="h-4 w-4" />
                            <span>Orders</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
