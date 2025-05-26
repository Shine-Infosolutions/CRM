import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const List = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  const moveLeadDown = async (index) => {
    if (index < leads.length - 1) {
      const updatedLeads = [...leads];
      const temp = updatedLeads[index];
      updatedLeads[index] = updatedLeads[index + 1];
      updatedLeads[index + 1] = temp;
      setLeads(updatedLeads);

      try {
        const leadA = updatedLeads[index];
        const leadB = updatedLeads[index + 1];

        await axios.put(
          "https://billing-backend-seven.vercel.app/lead/update-position",
          {
            leads: [
              { id: leadA._id, position: index },
              { id: leadB._id, position: index + 1 },
            ],
          }
        );

        toast.success("Lead reordered successfully");
      } catch (error) {
        toast.error("Failed to update order");
      }
    }
  };

  const moveLeadUp = async (index) => {
    if (index > 0) {
      const updatedLeads = [...leads];
      const temp = updatedLeads[index];
      updatedLeads[index] = updatedLeads[index - 1];
      updatedLeads[index - 1] = temp;
      setLeads(updatedLeads);

      try {
        const leadA = updatedLeads[index];
        const leadB = updatedLeads[index - 1];

        await axios.put(
          "https://billing-backend-seven.vercel.app/lead/update-position",
          {
            leads: [
              { id: leadA._id, position: index },
              { id: leadB._id, position: index - 1 },
            ],
          }
        );

        toast.success("Lead reordered successfully");
      } catch (error) {
        toast.error("Failed to update order");
      }
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 ">Current Leads</h1>
        <Link to="/LeadsForm">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-200 shadow-md">
            Add New
          </button>
        </Link>
      </div>

      <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Sr. No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Enquiry</th>
              <th className="px-6 py-4">Follow-Up</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  No leads available.
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-t border-gray-200 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-black">{index + 1}</td>
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
                  <td className="px-6 py-4">{lead.status}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-semibold"
                      onClick={() => moveLeadUp(index)}
                      disabled={index === 0}
                      title="Move Up"
                    >
                      ↑
                    </button>
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-semibold"
                      onClick={() => moveLeadDown(index)}
                      disabled={index === leads.length - 1}
                      title="Move Down"
                    >
                      ↓
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
