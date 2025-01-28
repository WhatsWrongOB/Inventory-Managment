import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVendor, getAllVendors } from "../../services/vendor";
import NotFound from "../../components/NotFound";

const Vendor = () => {
  const dispatch = useDispatch();
  const { vendors, loading } = useSelector((state) => state.vendor);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const filteredVendors = vendors.filter((vendor) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return (
      vendor?.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      vendor?.contact.toLowerCase().includes(lowerCaseSearchTerm) ||
      vendor?.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      vendor?.address.toLowerCase().includes(lowerCaseSearchTerm) ||
      vendor?.materials.some((item) =>
        item?.name.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  });

  function handleDelete(id) {
    setShowModal(true);
    setDeletedId(id);
  }

  function confirmation() {
    dispatch(deleteVendor(deletedId));
    setShowModal(false);
  }

  useEffect(() => {
    dispatch(getAllVendors());
  }, [dispatch]);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {loading && <Loader />}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-truck mr-2 text-blue-500"></i>
            Vendors
          </div>

          <Link to={"/add-vendor"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1 "></i>
              <p>Add vendor</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Vendor by name, contact, email, or materials"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {[
                "SR#",
                "Name",
                "Contact",
                "Email",
                "Address",
                "Materials",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="text-[0.92rem] py-3 px-4 border-b border-secondary"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredVendors.length > 0 &&
              filteredVendors.map((vendor, index) => (
                <tr
                  key={vendor._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {vendor.name}
                  </td>
                  <td className="py-3 pl-6 border-b border-secondary">
                    {vendor.contact}
                  </td>
                  <td className="py-3 pl-6 border-b border-secondary">
                    {vendor.email}
                  </td>
                  <td className="py-3 pl-10 border-b border-secondary">
                    {vendor.address}
                  </td>
                  <td className="py-3 pl-10 border-b border-secondary">
                    {vendor.materials.map((item) => item.name).join(", ")}
                  </td>
                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/edit-vendor/${vendor._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && filteredVendors.length === 0 && (
          <NotFound message={"vendor"} />
        )}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} isConfirm={confirmation} />
      )}
    </section>
  );
};

export default Vendor;
