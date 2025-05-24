import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const CustomerList = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "https://billing-backend-seven.vercel.app/customer/all"
      );
      setCustomer(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch customers");
      console.error(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const res = await axios.delete(
        `https://billing-backend-seven.vercel.app/customer/delete/${id}`
      );
      if (res.status === 200) {
        toast.success("Customer deleted");
        fetchCustomers();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <Toaster />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Current Customers
        </h1>
        <Link to="/CustomerForm">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 sm:px-5 rounded-xl transition duration-200 shadow-md">
            Add New
          </button>
        </Link>
      </div>

      {/* Table for desktop */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full min-w-[600px] table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {customer.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No details available.
                </td>
              </tr>
            ) : (
              customer.map((customer, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?u=${customer._id}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{customer.name}</span>
                  </td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.Address}</td>
                  <td className="px-6 py-4 flex flex-col sm:flex-row justify-center gap-2">
                    <button
                      onClick={() => navigate(`/CustomerForm/${customer._id}`)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteCustomer(customer._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="sm:hidden space-y-5">
        {customer.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No details available.
          </p>
        ) : (
          customer.map((customer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://i.pravatar.cc/40?u=${customer._id}`}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-lg text-purple-700">
                    {customer.name}
                  </div>
                  <div className="text-gray-500 text-sm">{customer.email}</div>
                </div>
              </div>
              <div className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Phone:</span> {customer.phone}
              </div>
              <div className="text-gray-700 text-sm mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {customer.Address}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => navigate(`/CustomerForm/${customer._id}`)}
                  className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded-lg text-sm font-semibold transition"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg text-sm font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerList;
