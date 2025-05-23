import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const CustomerList = ({c}) => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customer/all");
      setCustomer(res.data.data); 
    } catch (error) {
      toast.error("Failed to Fetch customer");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 items-center">
          Current Customers
        </h1>
        <Link to="/CustomerForm">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-200 shadow-md">
            Add New
          </button>
        </Link>
      </div>

      {/* Customer Table */}
      {customer.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No details available.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {customer.map((customer, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-t border-gray-200 transition-all duration-200"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/40?img=1"
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.Address}</td>
                  <td className="flex px-6 py-4 gap-2">
                    <button className="px-3 py-3 mx-2 my-0.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200">
                      UPDATE
                    </button>
                    <button className="px-3 py-3 mx-2 my-0.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200">
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
