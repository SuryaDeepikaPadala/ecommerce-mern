import React from "react";
import { GoGraph } from "react-icons/go";

import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminSidebar = ({ onLinkClick }) => {
  const menuItems = [
    
    {
      name: "products",
      icon: <FiShoppingCart />,
      path: "/admin/products",
      label: "Products",
    },
    {
      name: "orders",
      icon: <FaRegCircleCheck />,
      path: "/admin/orders",
      label: "Orders",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xl font-semibold px-2 pb-3 ">
        <GoGraph />
        <span>Admin Panel</span>
      </div>
      {menuItems.map((item) => (
        <Link
          to={item.path}
          key={item.name}
          onClick={onLinkClick}
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition-all"
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
