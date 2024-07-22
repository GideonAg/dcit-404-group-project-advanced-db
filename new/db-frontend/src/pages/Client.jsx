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

function Client() {
  const [client, setClient] = useState({
    clientFName: "",
    clientLName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(BASE_API + "/api/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
      if (response.ok) {
        alert("Client created successfully");
        setClient({
          clientFName: "",
          clientLName: "",
        });
      } else {
        alert("Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <Container>
      <Title>Add New Client</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Client First Name:</Label>
          <Input
            type="text"
            name="clientFName"
            value={client.clientFName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Client Last Name:</Label>
          <Input
            type="text"
            name="clientLName"
            value={client.clientLName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </FormGroup>
        <Button type="submit">Create Client</Button>
      </Form>
    </Container>
  );
}

export default Client;
