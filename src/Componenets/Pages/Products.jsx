import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pencil, Trash2 } from "lucide-react"; // Icons for buttons

export default function Product() {
  const formRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productUnit: "",
    productDiscount: "",
    productStock: "",
  });

  const startEditingProduct = (product) => {
    setEditingId(product._id);
    setFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      productUnit: product.productUnit,
      productDiscount: product.productDiscount,
      productStock: product.productStock,
    });
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    toast.info("Editing product...");
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://billing-backend-seven.vercel.app/billing/all"
      );
      setProducts(res.data.data);
    } catch (error) {
      toast.error("No more product list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(
          `https://billing-backend-seven.vercel.app/billing/update/${editingId}`,
          formData
        );
        toast.success("Product updated successfully");
      } else {
        await axios.post(
          "https://billing-backend-seven.vercel.app/billing/create",
          formData
        );
        toast.success("Product created successfully");
      }
      setFormData({
        productName: "",
        productPrice: "",
        productUnit: "",
        productDiscount: "",
        productStock: "",
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://billing-backend-seven.vercel.app/billing/delete/${id}`
      );
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="mx-auto p-6">
      <ToastContainer />

      {/* Form Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🛒 {editingId ? "Update" : "Add"} Product
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, productName: e.target.value }))
            }
            placeholder="Product Name"
            className="input border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, productPrice: e.target.value }))
            }
            placeholder="Amount (₹)"
            className="input border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="productDiscount"
            value={formData.productDiscount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                productDiscount: e.target.value,
              }))
            }
            placeholder="Discount %"
            className="input border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          <select
            name="productUnit"
            value={formData.productUnit}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, productUnit: e.target.value }))
            }
            className="input border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Unit</option>
            <option value="pcs">Pieces</option>
            <option value="kg">Kilograms</option>
            <option value="liters">Liters</option>
            <option value="pack">Pack</option>
            <option value="dozen">Dozen</option>
          </select>
          <input
            type="number"
            name="productStock"
            value={formData.productStock}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, productStock: e.target.value }))
            }
            placeholder="Stock Quantity"
            className="input border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-block px-4 py-3 
              text-sm font-semibold text-center 
                text-white uppercase transition duration-200 
                 ease-in-out bg-indigo-600 
                 rounded-md cursor-pointer 
                 hover:bg-indigo-700"
            >
              {loading
                ? editingId
                  ? "Updating..."
                  : "Adding..."
                : editingId
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📋 Products List
        </h2>

        {isLoading ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
                <thead className="bg-blue-100 text-blue-700 text-sm uppercase">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Amount (₹)</th>
                    <th className="p-3 text-left">Discount</th>
                    <th className="p-3 text-left">Unit</th>
                    <th className="p-3 text-left">Stock</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-gray-50 hover:bg-gray-100 transition-all rounded-lg"
                    >
                      <td className="p-3">{product.productName}</td>
                      <td className="p-3">₹{product.productPrice}</td>
                      <td className="p-3">{product.productDiscount}%</td>
                      <td className="p-3">{product.productUnit}</td>
                      <td className="p-3">{product.productStock}</td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => startEditingProduct(product)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-50 p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-bold text-blue-700">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600">
                    Amount: ₹{product.productPrice}
                  </p>
                  <p className="text-gray-600">
                    Discount: {product.productDiscount}%
                  </p>
                  <p className="text-gray-600">Unit: {product.productUnit}</p>
                  <p className="text-gray-600">Stock: {product.productStock}</p>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => startEditingProduct(product)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
