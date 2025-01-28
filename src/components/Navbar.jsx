import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/authentication";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Navbar = () => {
  const dispatch = useDispatch();

  const [showSidebar, setShowSidebar] = useState(false);

  const { loading } = useSelector((state) => state.authentication.signOut);

  function handleSignOut() {
    dispatch(logout());
  }

  return (
    <>
      <nav className="w-full h-[70px] bg-gray-900 text-gray-100 flex justify-between px-10 md:px-0 md:justify-around items-center">
        {loading && <Loader />}
        <div>
          <img
            className="w-[60px]"
            src="https://metrohrms.netlify.app/metro.png"
            alt="logo"
          />
        </div>

        <ul className="md:flex items-center gap-6 hidden">
          <Link className="text-sm" to={"/"}>
            <li>Home</li>
          </Link>
          <Link className="text-sm" to={"/material"}>
            <li>Materials</li>
          </Link>
          <Link className="text-sm" to={"/vendor"}>
            <li>Vendors</li>
          </Link>
          <Link className="text-sm" to={"/order"}>
            <li>Orders</li>
          </Link>
          <Link className="text-sm" to={"/product"}>
            <li>Products</li>
          </Link>
          <Link className="text-sm" to={"/production"}>
            <li>Productions</li>
          </Link>
          <Link className="text-sm" to={"/sale"}>
            <li>Sales</li>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={handleSignOut}
              className="bg-blue-900 w-[140px] flex justify-center items-center h-[35px] rounded-3xl"
            >
              <p>
                <i className="fas fa-sign-out-alt text-xs mr-1"></i> Logout
              </p>
            </button>
          </div>
        </ul>

        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="block md:hidden cursor-pointer"
        >
          <img className="w-[25px]" src="/menu.svg" alt="" />
        </div>
      </nav>
      <ResponsiveNavbar
        loading={loading}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleSignOut={handleSignOut}
      />
    </>
  );
};

export default Navbar;
