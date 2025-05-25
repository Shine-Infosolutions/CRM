import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const List = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        "https://billing-backend-seven.vercel.app/lead/all"
      );
      setLeads(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch leads");
    }
  };
  return (
    <div className="p-6">
      <Toaster />
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 ">Current Leads</h1>
        <Link to="/LeadsForm">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-200 shadow-md">
            Add New
          </button>
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Enquiry</th>
              <th className="px-6 py-4">Follow-Up</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No leads available.
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-t border-gray-200 transition-all duration-200"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?u=${
                        lead.email || lead.name || index
                      }`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{lead.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{lead.phone}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">{lead.enquiry}</td>
                  <td className="px-6 py-4">
                    {lead.followUpDate
                      ? new Date(lead.followUpDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        lead.status === "true"
                          ? "bg-purple-700 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {lead.status === "true"
                        ? "In Progress"
                        : "Not Interested"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden grid grid-cols-2 gap-4">
        {leads.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No leads available.</p>
        ) : (
          leads.map((lead, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2 min-w-0"
            >
              <div className="flex items-center gap-3 mb-2 min-w-0">
                <img
                  src={`https://i.pravatar.cc/40?u=${
                    lead.email || lead.name || index
                  }`}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-lg text-purple-700 truncate">
                    {lead.name}
                  </div>
                  <div className="text-gray-500 text-sm break-all truncate">
                    {lead.email}
                  </div>
                </div>
              </div>
              <div className="text-gray-700 text-sm mb-1 break-all">
                <span className="font-semibold">Phone:</span> {lead.phone}
              </div>
              <div className="text-gray-700 text-sm mb-1 break-all">
                <span className="font-semibold">Enquiry:</span> {lead.enquiry}
              </div>
              <div className="text-gray-700 text-sm mb-1 break-all">
                <span className="font-semibold">Follow-Up:</span>{" "}
                {lead.followUpDate
                  ? new Date(lead.followUpDate).toLocaleDateString()
                  : "—"}
              </div>
              <div className="text-gray-700 text-sm mb-2 break-all">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    lead.status === "true"
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {lead.status === "true" ? "In Progress" : "Not Interested"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
