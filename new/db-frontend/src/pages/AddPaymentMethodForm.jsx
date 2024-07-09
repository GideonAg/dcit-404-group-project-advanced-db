import React, { useState } from "react";
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

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
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
      const response = await fetch(BASE_API + "/api/createPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentMethodData),
      });
      if (response.ok) {
        alert("Payment method created successfully");
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
    <Container>
      <Title>Add New Payment Method</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Method Name:</Label>
          <Input
            type="text"
            name="methodName"
            value={paymentMethodData.methodName}
            onChange={handleChange}
            placeholder="Enter payment method name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Description:</Label>
          <Textarea
            name="description"
            value={paymentMethodData.description}
            onChange={handleChange}
            placeholder="Enter payment method description"
            required
          />
        </FormGroup>
        <Button type="submit">Create Payment Method</Button>
      </Form>
    </Container>
  );
}

export default AddPaymentMethodForm;
