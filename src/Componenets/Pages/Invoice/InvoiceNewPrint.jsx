// src/pages/InvoicePrint.js
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toWords } from "number-to-words";
import { useReactToPrint } from "react-to-print";

const InvoiceNewPrint = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `https://billing-backend-seven.vercel.app//invoices/mono/${id}`
        );
        const data = await response.json();
        if (data.success) {
          setInvoice(data.data);
        } else {
          setError("Invoice not found");
        }
      } catch (error) {
        setError("Error fetching invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
const handlePrint = useReactToPrint({
  content: () =>componentRef.current,
  documentTitle: 'Laundry Invoice',
 pageStyle: `
@page {
  size: A4;
  margin: 5mm;
}

@media print {
  html, body {
    margin: 0;
    padding: 24px;
    width: 250mm;
    height: 280mm;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
    

  #print-root, #root {
  height: 100vh;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .no-print {
    display: none !important;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  .invoice-container {
    margin: 0 auto;
    max-width: 180mm;
    padding: 10mm;
  }

  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }
}
`

});


  if (loading) return <div>Loading invoice...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white p-10 text-sm">
      {/* Print Button */}
      <div className="mb-4 text-right">
        <button
          className="no-print bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handlePrint}
        >
          🖨️ Print Invoice
        </button>
      </div>

      {/* Printable Content */}
      <div ref={componentRef}>
        <div className="border-4 border-black max-w-5xl mx-auto">
          <div className="flex justify-between items-center py-2 relative border-2 border-black border-l-0 border-r-0 border-t-0 p-4">
            <h1 className="text-xm text-blue-600 font-bold text-center w-full">
              T A X I N V O I C E
            </h1>
            <span className="absolute top-2 right-2 text-xm font-semibold mt-[1px]">
              ORIGINAL FOR RECIPIENT
            </span>
          </div>

          {/* Top Info Grid */}
          <div className="grid grid-cols-2 border-r-0 border-b-2 border-black">
            <div className="flex items-start gap-1 mb-2">
              <img
                src="/logo/Shine_logo.png"
                alt="Logo"
                className="w-[30%] h-[7rem] object-contain"
              />
              <div>
                <p className="text-lg font-bold">SHINE INFOSOLUTIONS</p>
                <p className="text-xs">
                  GSTIN: <span className="font-bold">09FTJPS4577P1ZD</span>
                </p>
                <p className="text-xs">
                  87a, Bankati chak, Raiganj road, Near Chhoti Masjid, Gorakhpur
                </p>
                <p className="text-xs">Gorakhpur, UTTAR PRADESH, 273001</p>
                <p className="text-xs">
                  <strong>Mobile:</strong> +91 7054284786, 9140427414
                </p>
                <p className="text-xs">
                  <strong>Email:</strong> info@shineinfosolutions.in
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 border border-t-0 border-b-0 border-r-0 border-black text-sm font-semibold text-black">
              <div className="border border-t-0 border-black p-2">
                <p>Invoice #:</p>
                <p className="font-bold">{invoice.invoiceNumber}</p>
              </div>
              <div className="border border-black border-t-0 border-r-0 p-2">
                <p>Invoice Date:</p>
                <p className="font-bold">{invoice.invoiceDate}</p>
              </div>
              <div className="border border-black border-b-0 p-2">
                <p>Place of Supply:</p>
                <p className="font-bold">{invoice.customerGST}</p>
              </div>
              <div className="border border-black border-b-0 border-r-0 p-2">
                <p>Due Date:</p>
                <p className="font-bold">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-2">
            <div className="border-r-2 border-black p-2 h-24">
              <p>
                <strong>Customer Details:</strong>
              </p>
              <p>GSTIN: {invoice.customerGST}</p>
              <p>Billing Address: {invoice.customerAddress}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="table-auto border-2 border-black w-full text-md border-r-0 border-l-0">
            <thead>
              <tr>
                <th className="border border-black px-2 py-1">#</th>
                <th className="border border-black px-2 py-1">Item</th>
                <th className="border border-black px-2 py-1">HSN/ SAC</th>
                <th className="border border-black px-2 py-1">Rate / Item</th>
                <th className="border border-black px-2 py-1">Qty</th>
                <th className="border border-black px-2 py-1">Taxable Value</th>
                <th className="border border-black px-2 py-1">Tax Amount</th>
                <th className="border border-black px-2 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.productDetails?.map((product, index) => (
                <tr key={index}>
                  <td className="border border-black px-2 py-1 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-black px-2 py-1">
                    {product.item}
                  </td>
                  <td className="border border-black px-2 py-1">
                    {product.hsn}
                  </td>
                  <td className="border border-black px-2 py-1">
                    ₹{product.rate}
                  </td>
                  <td className="border border-black px-2 py-1">
                    {product.qty}
                  </td>
                  <td className="border border-black px-2 py-1">
                    ₹{product.taxableValue}
                  </td>
                  <td className="border border-black px-2 py-1">
                    ₹{product.taxAmount}
                  </td>
                  <td className="border border-black px-2 py-1">
                    ₹{product.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-2 text-xs font-bold">
            <p>
              Total Items / Qty: {invoice.productDetails.length} /{" "}
              {invoice.productDetails.reduce(
                (acc, product) => acc + product.qty,
                0
              )}
            </p>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-2 border-t-2 border-black p-1">
            <div></div>
            <div className="p-2 text-xs text-center font-semibold">
              <p>
                <b>Taxable Amount: ₹</b> {invoice.amountDetails.totalAmount}
              </p>
              <p>
                <b>CGST 9.0%: ₹</b> {invoice.amountDetails.gstPercentage}
              </p>
              <p>
                <b>SGST 9.0%: ₹</b> {invoice.amountDetails.discountOnTotal}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 border-2 border-black border-b-0 border-r-0 border-l-0">
            <h2 className="font-bold p-2 text-md text-right mr-[-150px]">
              TOTAL: ₹ {invoice.amountDetails.totalAmount}
            </h2>
          </div>

          {/* Amount in words */}
          <table className="w-full table-fixed border-collapse border border-black text-xs border-t-2">
            <caption className="border-black border-t-2 border-4 border-r-0 border-l-0 border-b-0 caption-top p-2 text-right">
              <strong>Total amount (in words): INR</strong>{" "}
              {capitalizeWords(
                toWords(invoice.amountDetails.totalAmount) + " only"
              )}
            </caption>
          </table>

          {/* Footer */}
          <div className="grid grid-cols-2 border-t border-black">
            <div className="p-4">
              <p className="font-bold mb-1">Bank Details:</p>
              <p>
                <strong>Bank:</strong> HDFC Bank
              </p>
              <p>
                <strong>Account #:</strong> 50200068337918
              </p>
              <p>
                <strong>IFSC Code:</strong> HDFC0004331
              </p>
              <p>
                <strong>Branch:</strong> GEETA PRESS
              </p>
            </div>
            <div className="p-4 border-l border-black text-right flex flex-col justify-between">
              <div>
                <p className="font-semibold">Amount Payable: ₹</p>
              </div>
              <div>
                <p className="font-bold">For SHINE INFOSOLUTIONS</p>
                <p className="italic mt-6">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceNewPrint;
