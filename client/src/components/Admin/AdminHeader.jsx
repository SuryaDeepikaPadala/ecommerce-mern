import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import AdminSidebar from "./AdminSidebar";
import { useDispatch } from "react-redux";
import { logoutUserSlice } from "@/store/slices/auth.slice";
import { toast } from "sonner";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(logoutUserSlice()).then((res)=>{
      if(res?.payload?.success)
      {
        toast(res?.payload?.message)
      }
    })
  }
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm">
      {/* Left: Hamburger (visible on small screens) */}
      <div className="block sm:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <GiHamburgerMenu size={24} />
            </button>
          </SheetTrigger>

          {/* Top Sheet */}
          <SheetContent side="top" className="p-4 h-fit">
            <AdminSidebar onLinkClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Title or Empty Spacer */}
      <div className="text-lg font-semibold hidden sm:block"></div>

      {/* Right: Logout Button */}
      <div>
        <button onClick={handleLogout} className="flex justify-end items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100">
          <MdOutlineLogout size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
