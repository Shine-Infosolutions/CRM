import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const List = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // Input field value
  const [searchTerm, setSearchTerm] = useState(""); // Actual filter trigger
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = leads.filter((lead) => {
      const name = (lead.name || "").toLowerCase();
      const phone = String(lead.phone || "");
      const email = (lead.email || "").toLowerCase();
      const enquiry = (lead.enquiry || "").toLowerCase();
      const followUpDate = lead.followUpDate
        ? new Date(lead.followUpDate).toLocaleDateString().toLowerCase()
        : "";

      return (
        name.includes(lowerSearch) ||
        phone.includes(lowerSearch) ||
        email.includes(lowerSearch) ||
        enquiry.includes(lowerSearch) ||
        followUpDate.includes(lowerSearch)
      );
    });

    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchTerm("");
      setFilteredLeads(leads);
    }
  }, [searchInput, leads]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        "https://billing-backend-seven.vercel.app/lead/all"
      );
      setLeads(res.data.data || []);
      setFilteredLeads(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch leads");
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Current Leads</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Name, Phone, Email, Enquiry or Follow-Up Date"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(searchInput);
              }
            }}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={() => setSearchTerm(searchInput)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Search
          </button>
          <Link to="/LeadsForm">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-200">
              Add New
            </button>
          </Link>
        </div>
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
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No leads available.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, index) => (
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
                    <div className="font-medium">{lead.name}</div>
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
      <div className="sm:hidden grid grid-cols-1 xs:grid-cols-2 gap-4">
        {filteredLeads.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No leads available.</p>
        ) : (
          filteredLeads.map((lead, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border-l-4 border-purple-600 p-4 flex flex-col gap-2 min-w-0 transition-transform hover:scale-[1.02]"
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
                  <div className="font-bold text-lg text-purple-700 truncate">
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
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold shadow ${
                    lead.status === "true"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
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
