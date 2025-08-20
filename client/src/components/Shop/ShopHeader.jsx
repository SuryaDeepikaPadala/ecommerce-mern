import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineLogout, MdOutlineAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { shoppingHeaderNavItems } from "@/config";
import { Link, useNavigate, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { logoutUserSlice } from "@/store/slices/auth.slice";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartWrapper from "./CartWrapper";
import { Label } from "../ui/label";
import { clearCart } from "@/store/slices/cart.slice";

const ShopHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location=useLocation()
  const [searchParams,setSearchParams]=useSearchParams()
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const handleFilterNavigate = (item) => {
    sessionStorage.removeItem("filters");
    const filter = 
      item.id!=="Home" && item.id!=="Products" &&item.id!=="Search"?{
        
        category: [item?.id],
      }:null
    ;
    sessionStorage.setItem("filters", JSON.stringify(filter));
    location.pathname.includes("products") && filter!==null?
    setSearchParams(new URLSearchParams(`category=${item.id}`)):
    navigate(item?.path);
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold text-primary">
          <TiHomeOutline className="text-2xl" />
          <span>Supee's</span>
        </div>

        {/* Nav items (Desktop only) */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {shoppingHeaderNavItems?.map((item) => (
            <Label
              key={item.id}
              onClick={() => handleFilterNavigate(item)}
              className="text-primary pb-1 hover:text-primary transition"
            >
              {item.label}
            </Label>
          ))}
        </nav>

        {/* Cart and User */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative cursor-pointer">
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative">
                  <IoCartOutline className="text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>

              <CartWrapper />
            </Sheet>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback className=" bg-black text-white">
                  {user?.username?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem className="font-semibold">
                  Logged in as {user?.username}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                  <MdOutlineAccountCircle className="mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(logoutUserSlice()).then((res) => {
                      if (res?.payload?.success) {
                        toast(res?.payload?.message);
                        dispatch(clearCart());
                      }
                    });
                  }}
                >
                  <MdOutlineLogout className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hamburger menu (Mobile only) */}
          <Sheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}
            className="md:w-1/4"
          >
            <SheetTrigger asChild>
              <button className="block md:hidden text-xl">
                <GiHamburgerMenu />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="md:hidden w-full h-fit px-6 py-4 space-y-4 shadow-md bg-white"
            >
              {shoppingHeaderNavItems?.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSheetOpen(false)} // close sheet
                  className={({ isActive }) =>
                    isActive
                      ? "block text-lg text-primary font-semibold"
                      : "block text-lg text-gray-700 hover:text-primary"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
