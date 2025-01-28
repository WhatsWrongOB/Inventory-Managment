import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteSale, getAllSales } from "../../services/sale";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import NotFound from "../../components/NotFound";

const Sale = () => {
  const dispatch = useDispatch();
  const { sales, loading } = useSelector((state) => state.sale);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedId, setDeletedId] = useState(null);

  const filteredSales = sales.filter((sale) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return (
      sale.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.customerName.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.noOfUnitsSold.toString().includes(lowerCaseSearchTerm) ||
      sale.totalSale.toString().includes(lowerCaseSearchTerm) ||
      sale.pricePerUnit.toString().includes(lowerCaseSearchTerm)
    );
  });

  function handleDelete(id) {
    setShowModal(true);
    setDeletedId(id);
  }

  function confirmation() {
    dispatch(deleteSale(deletedId));
    setShowModal(false);
  }

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {loading && <Loader />}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-cogs mr-2 text-blue-500"></i>
            Sales
          </div>
          <Link to={"/add-sale"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1 "></i>
              <p>Add sales</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Sale by product name, customer, or amount"
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
                "Product Name",
                "Customer Name",
                "No Of Units Sold",
                "Total Sales",
                "Price Per Unit",
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
            {filteredSales.length > 0 &&
              filteredSales.map((sale, index) => (
                <tr
                  key={sale.saleId}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {sale.productName}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {sale.customerName}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {sale.noOfUnitsSold}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {sale.totalSale}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {sale.pricePerUnit}
                  </td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/edit-sale/${sale.saleId}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(sale.saleId)}
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

        {!loading && filteredSales.length === 0 && (
          <NotFound message={"sale"} />
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} isConfirm={confirmation} />
      )}
    </section>
  );
};

export default Sale;
