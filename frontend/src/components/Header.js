import React from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="flex justify-between items-center px-6 py-4 h-auto w-full border-b-2 border-slate-300">
      <div className="flex items-center justify-center">
        <Link to={"/"} className="text-2xl font-bold text-blue-500 font-serif">
          Painters
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <ul className="flex items-center justify-between gap-8">
          <Link
            to={"/cart"}
            className="flex gap-1 items-center justify-center hover:text-blue-500 cursor-pointer text-lg"
          >
            <span>
              <AiOutlineShoppingCart />
            </span>
            <p>Cart</p>
          </Link>
          <Link
            to={"/profile"}
            className="flex gap-1 items-center justify-center hover:text-blue-500 cursor-pointer text-lg"
          >
            <span>
              <AiOutlineUser />
            </span>
            <p>Profile</p>
          </Link>
          <Link
            to={"/login"}
            className="flex gap-1 items-center justify-center hover:text-blue-500 cursor-pointer text-lg"
          >
            <p>Login</p>
            <span></span>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
