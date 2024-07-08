import React, { useState } from "react";

function AddPaymentMethodForm() {
  const [paymentMethodData, setPaymentMethodData] = useState({
    methodName: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentMethodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/paymentMethods/createPaymentMethod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentMethodData),
      });
      if (response.ok) {
        alert("Payment method created successfully");
        // Optionally clear the form
        setPaymentMethodData({
          methodName: "",
          description: "",
        });
      } else {
        alert("Failed to create payment method");
      }
    } catch (error) {
      console.error("Error creating payment method:", error);
    }
  };

  return (
    <div>
      <h1>Add New Payment Method</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Method Name:
            <input
              type="text"
              name="methodName"
              value={paymentMethodData.methodName}
              onChange={handleChange}
              placeholder="Enter payment method name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={paymentMethodData.description}
              onChange={handleChange}
              placeholder="Enter payment method description"
              required
            />
          </label>
        </div>
        <button type="submit">Create Payment Method</button>
      </form>
    </div>
  );
}

export default AddPaymentMethodForm;
