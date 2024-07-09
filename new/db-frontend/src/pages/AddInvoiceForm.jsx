import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BASE_API } from "../utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #0073e6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

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
    fetch(BASE_API + "/api/registrations")
      .then((response) => response.json())
      .then((data) => setRegistrations(data))
      .catch((error) =>
        console.error("Error fetching registrations:", error)
      );

    fetch(BASE_API + "/api/getPayment")
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
      const response = await fetch(BASE_API + "/api/createInvoice", {
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
        });
      } else {
        alert("Failed to create invoice");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <Container>
      <Title>Add New Invoice</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Date Raised:</Label>
          <Input
            type="date"
            name="dateRaised"
            value={invoiceData.dateRaised}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Date Paid:</Label>
          <Input
            type="date"
            name="datePaid"
            value={invoiceData.datePaid}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Credit Card Number:</Label>
          <Input
            type="text"
            name="creditCardNo"
            value={invoiceData.creditCardNo}
            onChange={handleChange}
            placeholder="Enter credit card number"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Holder's Name:</Label>
          <Input
            type="text"
            name="holdersName"
            value={invoiceData.holdersName}
            onChange={handleChange}
            placeholder="Enter holder's name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Expiry Date:</Label>
          <Input
            type="text"
            name="expiryDate"
            value={invoiceData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Registration:</Label>
          <Select
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
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Payment Method:</Label>
          <Select
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
          </Select>
        </FormGroup>
        <Button type="submit">Create Invoice</Button>
      </Form>
    </Container>
  );
}

export default AddInvoiceForm;
