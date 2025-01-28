import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProductById } from "../../services/product";
import { getAllMaterials } from "../../services/material";
import { useNavigate, useParams } from "react-router-dom";
import { productSchema } from "../../validations";
import Select from "react-select";
import { ClipLoader } from "react-spinners";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, product } = useSelector((state) => state.product);
  const { materials } = useSelector((state) => state.material);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: "",
      pricePerUnit: "",
      rawMaterials: [
        {
          value: "",
          label: "",
        },
      ],
    },
  });

  useEffect(() => {
    dispatch(getProductById(id))
      .unwrap()
      .then((data) => {
        setValue("name", data.name);
        setValue("quantity", data.quantity);
        setValue("pricePerUnit", data.pricePerUnit);
        setValue(
          "rawMaterials",
          data.rawMaterials.map((material) => ({
            value: material.name,
            label: material.name,
          }))
        );
      })
      .catch((error) => console.error("Error fetching product:", error));

    dispatch(getAllMaterials());
  }, [id, dispatch, setValue]);

  const onSubmit = (data) => {
    const product = {
      ...data,
      rawMaterials: data.rawMaterials.map((material) => material.value),
    };

    dispatch(updateProduct({ id, product }))
      .unwrap()
      .then(() => navigate("/product"))
      .catch((error) => {
        console.error("Error updating product:", error.message);
      });
  };

  const handleMaterialChange = (selectedOptions) => {
    setValue("rawMaterials", selectedOptions || []);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="w-[96%] lg:max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-6">Update Product</h2>
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ClipLoader loading={loading} color={"blue"} size={50} />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                {...register("quantity", { valueAsNumber: true })}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="pricePerUnit"
                className="block text-sm font-medium text-gray-700"
              >
                Price Per Unit
              </label>
              <input
                type="number"
                id="pricePerUnit"
                {...register("pricePerUnit", { valueAsNumber: true })}
                className={`w-full px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.pricePerUnit ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter price per unit"
              />
              {errors.pricePerUnit && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pricePerUnit.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rawMaterials"
                className="block text-sm font-medium text-gray-700"
              >
                Raw Materials
              </label>
              <Select
                id="rawMaterials"
                isMulti
                options={materials.map((material) => ({
                  value: material.name,
                  label: material.name,
                }))}
                onChange={handleMaterialChange}
                defaultValue={product?.rawMaterials?.map((material) => ({
                  value: material.name,
                  label: material.name,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              {errors.rawMaterials && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rawMaterials.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader loading={loading} color={"white"} size={12} />
              ) : (
                "Update Product"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
