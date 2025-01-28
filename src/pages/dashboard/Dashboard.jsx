import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="h-auto lg:h-[83vh] w-full flex justify-center items-center">
      <div className="my-10 px-5 flex justify-around gap-2 items-center flex-wrap">
        {/* Raw Material */}
        <Link
          to="/material"
          className="flex-grow w-[97%] sm:w-[400px] h-[180px] rounded-2xl border border-gray-300 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 transition duration-300 ease-in-out"
        >
          <i className="fas fa-cogs text-4xl text-blue-500"></i>
          <h3 className="mt-2 text-lg font-semibold text-blue-500">
            Raw Material
          </h3>
        </Link>

        {/* Vendor */}
        <Link
          to="/vendor"
          className="flex-grow w-[97%] sm:w-[400px] h-[180px] rounded-2xl border border-gray-300 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 transition duration-300 ease-in-out"
        >
          <i className="fas fa-truck text-4xl text-blue-500"></i>
          <h3 className="mt-2 text-lg font-semibold text-blue-500">Vendor</h3>
        </Link>

        {/* Orders */}
        <Link
          to="/order"
          className="flex-grow w-[97%] sm:w-[400px] h-[180px] rounded-2xl border border-gray-300 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 transition duration-300 ease-in-out"
        >
          <i className="fas fa-box text-4xl text-blue-500"></i>
          <h3 className="mt-2 text-lg font-semibold text-blue-500">Orders</h3>
        </Link>

        {/* Product */}
        <Link
          to="/product"
          className="flex-grow w-[97%] sm:w-[400px] h-[180px] rounded-2xl border border-gray-300 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 transition duration-300 ease-in-out"
        >
          <i className="fas fa-cube text-4xl text-blue-500"></i>
          <h3 className="mt-2 text-lg font-semibold text-blue-500">Product</h3>
        </Link>

        {/* Sales */}
        <Link
          to="/sale"
          className="flex-grow w-[97%] sm:w-[400px] h-[180px] rounded-2xl border border-gray-300 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 transition duration-300 ease-in-out"
        >
          <i className="fas fa-chart-line text-4xl text-blue-500"></i>
          <h3 className="mt-2 text-lg font-semibold text-blue-500">Sales</h3>
        </Link>

        {/* Sales Management */}
        <Link
          to="/production"
          className="flex-grow w-[97%] sm:w-[400px] h-[180px] rounded-2xl border border-gray-300 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 transition duration-300 ease-in-out"
        >
          <i className="fas fa-clipboard-list text-4xl text-blue-500"></i>
          <h3 className="mt-2 text-lg font-semibold text-blue-500">
            Production
          </h3>
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
