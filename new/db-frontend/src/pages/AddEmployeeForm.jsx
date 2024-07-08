import React, { useState } from "react";
import { BASE_API } from "../utils";

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(BASE_API + "/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Employee created successfully");
        setFormData({
          firstName: "",
          lastName: "",
          position: "",
        });
      } else {
        console.error("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Employee</h1>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter position"
            required
          />
        </label>
      </div>
      <button type="submit">Create Employee</button>
    </form>
  );
}

export default AddEmployeeForm;
