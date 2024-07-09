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

function AddLocationForm() {
  const [locationData, setLocationData] = useState({
    locationName: "",
    maxSize: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!locationData.locationName || !locationData.maxSize) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(BASE_API + "/api/createLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });
      if (response.ok) {
        console.log("Location created successfully");
        setLocationData({
          locationName: "",
          maxSize: "",
        });
      } else {
        alert("Failed to create location");
      }
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  return (
    <Container>
      <Title>Add New Location</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Location Name:</Label>
          <Input
            type="text"
            name="locationName"
            value={locationData.locationName}
            onChange={handleChange}
            placeholder="Enter location name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Max Size:</Label>
          <Input
            type="number"
            name="maxSize"
            value={locationData.maxSize}
            onChange={handleChange}
            placeholder="Enter maximum size"
            required
          />
        </FormGroup>
        <Button type="submit">Create Location</Button>
      </Form>
    </Container>
  );
}

export default AddLocationForm;
