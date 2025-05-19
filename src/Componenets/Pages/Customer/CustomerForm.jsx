import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // hook to navigate to another page
import { ToastContainer, toast } from "react-toastify"; // for toast notifications

const CustomerForm = ({ customer, setCustomer }) => {
  const navigate = useNavigate(); // hook to navigate to another page
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    Address: "",
    WhatsApp: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomer((prev) => [...prev, formData]); // update state
    toast.success("Detail submitted successfully!"); // show toast

    setTimeout(() => {
      navigate("/CustomerList"); // navigate after delay
    }, 2000); // wait 2 seconds

    setFormData({
      name: "",
      phone: "",
      email: "",
      Address: "",
      WhatsApp: "",
    });

  };

  return (
    <div className="mx-full  p-6 rounded-2xl shadow-xl border border-gray-200 bg-white h-[100vh]">
      <ToastContainer position="top-right" reverseOrder={false} />
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-700 tracking-wide">
        Add New Customer
      </h2>
      <hr className="mb-6 border-gray-300" />
      <div className="overflow-y-auto h-[75vh] pr-3">
        <form onSubmit={handleSubmit} className="space-y-8 text-gray-700">
          {/* Name & Primary Number */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Customer Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Primary Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Secondary Number & Address */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Emaiil</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Address</label>
              <input
                type="text"
                name="Address"
                placeholder="Full address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Secondary Number & Address */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="WhatsApp"
                placeholder="Optional number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.WhatsApp}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={
                !formData.name ||
                !formData.phone ||
                !formData.Address ||
                !formData.email
              } //Adding new condition for email
              type="submit"
              className="px-10 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Submit Detail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
