import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/authentication";
import Loader from "./Loader";

const Header = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.authentication.signOut);
  const {
    user: { username },
  } = useSelector((state) => state.authentication.signIn);

  function handleSignOut() {
    dispatch(logout());
  }

  return (
    <nav className="w-full mb-6 h-[70px] bg-gray-900 text-gray-100 flex justify-between px-5 sm:px-0 sm:justify-around items-center">
      {loading && <Loader />}
      <div>
        <img
          className="w-[60px]"
          src="https://metrohrms.netlify.app/metro.png"
          alt="logo"
        />
      </div>

      <div className="flex items-center gap-4 text-sm">
        <p>{username.slice(0, 1).toUpperCase() + username.slice(1)}</p>
        <span> | </span>
        <button
          onClick={handleSignOut}
          className="flex justify-center items-center h-[35px] rounded-3xl"
        >
          <p>
            <i className="fas fa-sign-out-alt text-xs mr-1"></i> Logout
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Header;
