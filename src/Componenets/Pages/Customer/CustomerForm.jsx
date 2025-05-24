import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const CustomerForm = () => {
  const { id } = useParams(); // Get the id from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    Address: "",
    WhatsApp: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch existing customer data to edit
      axios
        .get(`https://billing-backend-seven.vercel.app/customer/mono/${id}`)
        .then((res) => {
          const { name, phone, email, Address, WhatsApp } = res.data.data;
          setFormData({
            name: name || "",
            phone: phone || "",
            email: email || "",
            Address: Address || "",
            WhatsApp: WhatsApp || "",
          });
        })
        .catch((err) => {
          toast.error("Failed to load customer data");
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update
        await axios.put(
          `https://billing-backend-seven.vercel.app/customer/update/${id}`,
          formData
        );
        toast.success("Customer updated successfully");
      } else {
        // Add new
        await axios.post("https://billing-backend-seven.vercel.app/customer/add", formData);
        toast.success("Customer added successfully");
      }

      navigate("/CustomerList"); // or wherever your list is
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
  return (
    <div className="mx-full  p-6 rounded-2xl shadow-xl border border-gray-200 bg-white h-[100vh]">
      <Toaster position="top-right" reverseOrder={false} />
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
              disabled={
                !formData.name ||
                !formData.phone ||
                !formData.Address ||
                !formData.email
              }
              type="submit"
              className="px-10 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200"
            >
              {id ? "Update" : "Submit"} Detail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
