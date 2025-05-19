import React from "react";
import { Link } from "react-router-dom";

const List = ({ leads }) => {
  return (
    <div className="p-6">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 ">Current Leads</h1>
        <Link to="/LeadsForm">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-200 shadow-md">
            Add New
          </button>
        </Link>
      </div>

      {/* Lead Table */}
      {leads.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No leads available.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
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
              {leads.map((lead, index) => (
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
                      {lead.status === "true" ? "In Progress" : "Not Interested"}
                    </span>
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

export default List;
