import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const InvoiceNewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerGST: "",
    invoiceDate: "",
    dueDate: "",
    customerName: "",
    invoiceNumber: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
    dispatchThrough: "",
    customerAadhar: "",
    productDetails: [],
    amountDetails: {
      gstPercentage: "",
      discountOnTotal: "",
      totalAmount: "",
    },
  });

  const [rows, setRows] = useState([
    {
      description: "",
      unit: "",
      quantity: "",
      price: "",
      discount: "",
      amount: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        description: "",
        unit: "",
        quantity: "",
        price: "",
        discount: "",
        amount: "",
      },
    ]);
  };
  useEffect(() => {
    if (id) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(
            `https://billing-backend-seven.vercel.app//invoices/mono/${id}`
          );
          setFormData({
            ...response.data.data,
            productDetails: response.data.data.productDetails || [],
          });

          // Set rows
          const rows = response.data.data.productDetails.map((product) => ({
            description: product.description,
            unit: product.unit,
            quantity: product.quantity,
            price: product.price,
            discount: product.discountPercentage,
            amount: product.amount,
            invoiceNumber: product.invoiceNumber,
          }));

          setRows(rows);
        } catch (error) {
          toast.error("Error fetching invoice details for editing.");
        }
      };

      fetchInvoice();
    }
  }, [id]);
  const handleRemoveRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  const handleInputChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedAmountDetails = {
        ...prev.amountDetails,
        [name]: value,
      };

      // Calculate the sum of all product amounts
      const baseAmount = rows.reduce(
        (sum, row) => sum + (parseFloat(row.amount) || 0),
        0
      );

      // Calculate GST and discount
      const gstPercentage = parseFloat(updatedAmountDetails.gstPercentage) || 0;
      const discountOnTotal =
        parseFloat(updatedAmountDetails.discountOnTotal) || 0;

      // Calculate total amount
      const totalAmount =
        baseAmount * (1 + gstPercentage / 100) - discountOnTotal;

      return {
        ...prev,
        amountDetails: {
          ...updatedAmountDetails,
          totalAmount: totalAmount.toFixed(2), // Update total amount
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productDetails = rows.map((row) => ({
      description: row.description,
      unit: row.unit,
      quantity: parseFloat(row.quantity) || 0,
      price: parseFloat(row.price) || 0,
      discountPercentage: parseFloat(row.discount) || 0,
      amount: parseFloat(row.amount) || 0,
    }));

    const payload = {
      ...formData,
      productDetails, // ensure the correct format for productDetails
    };

    try {
      if (id) {
        // Update the invoice using PUT request
        await axios.put(`https://billing-backend-seven.vercel.app//invoices/update/${id}`, payload);
        toast.success("Invoice updated successfully!");
      } else {
        // Create a new invoice
        await axios.post("https://billing-backend-seven.vercel.app//invoices/create", payload);
        toast.success("Invoice created successfully!");
      }

      // Reset form
      setFormData({
        customerGST: "",
        invoiceDate: "",
        dueDate: "",
        customerName: "",
        invoiceNumber: "",
        customerAddress: "",
        customerPhone: "",
        customerEmail: "",
        dispatchThrough: "",
        customerAadhar: "",
        productDetails: [],
        amountDetails: {
          gstPercentage: "",
          discountOnTotal: "",
          totalAmount: "",
        },
      });

      setRows([
        {
          description: "",
          unit: "",
          quantity: "",
          price: "",
          discount: "",
          amount: "",
        },
      ]);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error submitting the form");
    }

    setTimeout(() => {
      navigate("/InvoiceNewList"); // Navigate after submission
    }, 2000);
  };

  const [productOptions, setProductOptions] = useState([]);

  // Fetch all product names on component mount
  useEffect(() => {
    axios
      .get("https://billing-backend-seven.vercel.app//billing/all/wp")
      .then((res) => {
        setProductOptions(res.data.data.map((product) => product.productName));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Invoice Form</h1>
      <div className="mb-6 shadow-lg p-4 rounded">
        <div>
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="mb-2">Invoice Date:</label>
              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="mb-2">Customer Name:</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Customer Name"
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="mb-2">Invoice Number:</label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                placeholder="Invoice Number"
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="mb-2">Customer Address:</label>
              <textarea
                rows={3}
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                placeholder="Customer Address"
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="mb-2">Customer Phone:</label>
              <input
                type="text"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="Customer Phone"
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="mb-2">Customer Email:</label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="Customer Email"
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="mb-2">Dispatch Through:</label>
              <input
                type="text"
                name="dispatchThrough"
                value={formData.dispatchThrough}
                onChange={handleChange}
                placeholder="Dispatch Through (optional)"
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="mb-2">Customer GSTIN:</label>
              <input
                type="text"
                name="customerGST"
                value={formData.customerGST}
                onChange={handleChange}
                placeholder="Customer GSTIN"
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="mb-2">Customer Aadhar:</label>
              <input
                type="text"
                name="customerAadhar"
                value={formData.customerAadhar}
                onChange={handleChange}
                placeholder="Customer Aadhar"
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <hr />
            <div className="overflow-x-auto mt-4 mb-4">
              <table className="min-w-full table-auto">
                {/* Table Header */}
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th className="p-2">Description</th>
                    <th className="p-2">Unit</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Discount %</th>
                    <th className="p-2">Amount</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="flex flex-col md:table-row w-full"
                    >
                      {[
                        "description",
                        "unit",
                        "quantity",
                        "price",
                        "discount",
                        "amount",
                      ].map((field) => (
                        <td key={field} className="p-2">
                          {field === "description" ? (
                            <>
                              <input
                                list="product-list"
                                type="text"
                                value={row[field]}
                                onChange={(e) =>
                                  handleInputChange(e, index, field)
                                }
                                placeholder="Product name"
                                className="border rounded p-2 w-full"
                              />
                              {index === 0 && (
                                <datalist id="product-list">
                                  {productOptions.map((name, i) => (
                                    <option key={i} value={name} />
                                  ))}
                                </datalist>
                              )}
                            </>
                          ) : field === "unit" ? (
                            <select
                              value={row[field]}
                              onChange={(e) =>
                                handleInputChange(e, index, field)
                              }
                              className="border rounded p-2 w-full"
                            >
                              <option value="">Select Unit</option>
                              <option value="pcs">Pieces</option>
                              <option value="kg">Kilograms</option>
                              <option value="liters">Liters</option>
                              <option value="pack">Pack</option>
                              <option value="dozen">Dozen</option>
                            </select>
                          ) : field === "quantity" || field === "discount" ? (
                            <input
                              type="number"
                              value={row[field]}
                              onChange={(e) => {
                                handleInputChange(e, index, field);
                                if (
                                  field === "quantity" ||
                                  field === "discount"
                                ) {
                                  const updatedRows = [...rows];
                                  const quantity =
                                    parseFloat(updatedRows[index].quantity) ||
                                    0;
                                  const price =
                                    parseFloat(updatedRows[index].price) || 0;
                                  const discount =
                                    parseFloat(updatedRows[index].discount) ||
                                    0;
                                  const amount =
                                    price * quantity * (1 - discount / 100);
                                  updatedRows[index].amount = amount.toFixed(2);
                                  setRows(updatedRows);
                                }
                              }}
                              placeholder={
                                field === "discount" ? "Discount (%)" : field
                              }
                              className="border rounded p-2 w-full"
                            />
                          ) : field === "price" ? (
                            <input
                              type="number"
                              value={row[field]}
                              onChange={(e) => {
                                handleInputChange(e, index, field);
                                const updatedRows = [...rows];
                                const quantity =
                                  parseFloat(updatedRows[index].quantity) || 0;
                                const price = parseFloat(e.target.value) || 0;
                                const discount =
                                  parseFloat(updatedRows[index].discount) || 0;
                                const amount =
                                  price * quantity * (1 - discount / 100);
                                updatedRows[index].amount = amount.toFixed(2);
                                setRows(updatedRows);
                              }}
                              placeholder="Price"
                              className="border rounded p-2 w-full"
                            />
                          ) : field === "amount" ? (
                            <input
                              type="text"
                              value={row[field]}
                              readOnly
                              placeholder="Amount"
                              className="border rounded p-2 w-full bg-gray-100"
                            />
                          ) : (
                            <input
                              type="text"
                              value={row[field]}
                              onChange={(e) =>
                                handleInputChange(e, index, field)
                              }
                              placeholder={field}
                              className="border rounded p-2 w-full"
                            />
                          )}
                        </td>
                      ))}

                      {/* Add and Remove Buttons */}
                      <td className="p-2">
                        <button
                          type="button"
                          onClick={handleAddRow}
                          className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
                        >
                          Add
                        </button>
                      </td>
                      <td className="p-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className={`bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto ${
                            rows.length <= 1
                              ? "cursor-not-allowed opacity-50"
                              : "hover:bg-red-600"
                          }`}
                          disabled={rows.length <= 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Amount Details */}
          <div className="gst flex flex-wrap gap-6 mt-6 justify-between mb-4">
            {["gstPercentage", "discountOnTotal", "totalAmount"].map(
              (field, idx) => (
                <div key={idx} className="flex flex-col w-full sm:w-1/4">
                  <label className="mb-2">
                    {field === "gstPercentage"
                      ? "GST Percentage"
                      : field === "discountOnTotal"
                      ? "Discount on Total"
                      : "Total Amount"}
                  </label>

                  <input
                    type="number"
                    name={field}
                    value={formData.amountDetails[field]}
                    onChange={
                      field !== "totalAmount" ? handleDiscountChange : undefined
                    } // Disable onChange for totalAmount
                    placeholder={
                      field === "gstPercentage"
                        ? "GST Percentage"
                        : field === "discountOnTotal"
                        ? "Discount on Total"
                        : "Total Amount"
                    }
                    className={`border rounded p-2 w-full ${
                      field === "totalAmount" ? "bg-gray-100" : ""
                    }`}
                    readOnly={field === "totalAmount"} // Make totalAmount read-only
                  />
                </div>
              )
            )}
          </div>

          <hr />
          <div className="flex justify-center align-center">
            <button
              onClick={handleSubmit}
              disabled={
                !formData.customerName ||
                !formData.invoiceDate ||
                !formData.dueDate ||
                !formData.customerGST ||
                !formData.customerAddress ||
                !formData.customerPhone ||
                !formData.customerEmail ||
                rows.some((row) => {
                  return (
                    !row.description ||
                    !row.unit ||
                    !row.quantity ||
                    !row.price ||
                    !row.discount
                  );
                })
              } //Adding new condition for email
              type="submit"
              className="border-2 py-2 px-4 mt-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              {id ? "Update Invoice" : "Create Invoice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceNewForm;
