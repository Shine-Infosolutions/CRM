import React, { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const InvoiceNewList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("https://billing-backend-seven.vercel.app//invoices/all");
        const data = await response.json();
        setInvoices(data.data || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toISOString().split("T")[0];
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    
    try {
      await axios.delete(`https://billing-backend-seven.vercel.app//invoices/delete/${id}`);
      setInvoices((prev) => prev.filter((inv) => inv._id !== id));
      toast.success("Invoice deleted successfully!");
    } catch (error) {
      toast.error("Error deleting invoice");
      console.error("Error deleting invoice:", error);
    }
  };
  const handleEdit = (id) =>{ navigate(`/InvoiceNewForm/${id}`);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-3"></div>
        <p className="text-gray-600 text-lg">Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className="p-4  mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Invoices</h2>
        <Link
          to="/InvoiceNewForm"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          + Create Invoice
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-3 border-b">Invoice No</th>
              <th className="px-4 py-3 border-b">Customer</th>
              <th className="px-4 py-3 border-b">Date</th>
              <th className="px-4 py-3 border-b">Due Date</th>
              <th className="px-4 py-3 border-b">Amount</th>
              <th className="px-4 py-3 border-b">View</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-50 text-center">
                  <td className="px-4 py-3 border-b">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-3 border-b">{invoice.customerName}</td>
                  <td className="px-4 py-3 border-b">{formatDate(invoice.invoiceDate)}</td>
                  <td className="px-4 py-3 border-b">{formatDate(invoice.dueDate)}</td>
                  <td className="px-4 py-3 border-b">{invoice.amountDetails?.totalAmount ?? "N/A"}</td>
                  <td className="px-4 py-3 border-b">
                    <Link
                      to={`/InvoiceNewPrint/${invoice._id}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-4 py-3 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(invoice._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(invoice._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
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

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4 mt-6">
        {invoices.length === 0 ? (
          <p className="text-center text-gray-500">No invoices found.</p>
        ) : (
          invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white p-4 rounded-md shadow border border-gray-200"
            >
              <p className="mb-1">
                <strong>Invoice No:</strong> {invoice.invoiceNumber}
              </p>
              <p className="mb-1">
                <strong>Customer:</strong> {invoice.customerName}
              </p>
              <p className="mb-1">
                <strong>Date:</strong> {formatDate(invoice.invoiceDate)}
              </p>
              <p className="mb-1">
                <strong>Due Date:</strong> {formatDate(invoice.dueDate)}
              </p>
              <p className="mb-2">
                <strong>Amount:</strong>{" "}
                {invoice.amountDetails?.totalAmount ?? "N/A"}
              </p>
              <div className="flex justify-between">
                <Link
                  to={`/InvoiceNewPrint/${invoice._id}`}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  View
                </Link>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(invoice._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(invoice._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default memo(InvoiceNewList);
