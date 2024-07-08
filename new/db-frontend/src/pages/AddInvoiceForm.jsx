import React, { useState, useEffect } from "react";

function AddInvoiceForm() {
  const [invoiceData, setInvoiceData] = useState({
    dateRaised: "",
    datePaid: "",
    creditCardNo: "",
    holdersName: "",
    expiryDate: "",
    registrationNo: "",
    paymentMethodNo: "",
  });
  const [registrations, setRegistrations] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Fetch Registrations and Payment Methods on component mount
  useEffect(() => {
    fetch("/api/registrations")
      .then((response) => response.json())
      .then((data) => setRegistrations(data))
      .catch((error) => console.error("Error fetching registrations:", error));

    fetch("/api/paymentMethods")
      .then((response) => response.json())
      .then((data) => setPaymentMethods(data))
      .catch((error) =>
        console.error("Error fetching payment methods:", error)
      );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/invoices/createInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });
      if (response.ok) {
        alert("Invoice created successfully");
        setInvoiceData({
          dateRaised: "",
          datePaid: "",
          creditCardNo: "",
          holdersName: "",
          expiryDate: "",
          registrationNo: "",
          paymentMethodNo: "",
        }); // Clear the form
      } else {
        alert("Failed to create invoice");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div>
      <h1>Add New Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date Raised:
            <input
              type="date"
              name="dateRaised"
              value={invoiceData.dateRaised}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Date Paid:
            <input
              type="date"
              name="datePaid"
              value={invoiceData.datePaid}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Credit Card Number:
            <input
              type="text"
              name="creditCardNo"
              value={invoiceData.creditCardNo}
              onChange={handleChange}
              placeholder="Enter credit card number"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Holder's Name:
            <input
              type="text"
              name="holdersName"
              value={invoiceData.holdersName}
              onChange={handleChange}
              placeholder="Enter holder's name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Expiry Date:
            <input
              type="text"
              name="expiryDate"
              value={invoiceData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Registration:
            <select
              name="registrationNo"
              value={invoiceData.registrationNo}
              onChange={handleChange}
              required
            >
              <option value="">Select a Registration</option>
              {registrations.map((reg) => (
                <option key={reg.registrationNo} value={reg.registrationNo}>
                  {reg.registrationNo} - {reg.details}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Payment Method:
            <select
              name="paymentMethodNo"
              value={invoiceData.paymentMethodNo}
              onChange={handleChange}
              required
            >
              <option value="">Select a Payment Method</option>
              {paymentMethods.map((method) => (
                <option
                  key={method.paymentMethodNo}
                  value={method.paymentMethodNo}
                >
                  {method.methodName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}

export default AddInvoiceForm;
