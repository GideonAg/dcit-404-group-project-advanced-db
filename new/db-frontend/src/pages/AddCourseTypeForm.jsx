import React, { useState } from "react";
import { BASE_API } from "../utils";

function AddCourseTypeForm() {
  const [formData, setFormData] = useState({
    courseTypeDescription: "",
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
      const response = await fetch(BASE_API + "/api/courseTypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Course Type created successfully");
        setFormData({
          courseTypeDescription: "",
        });
      } else {
        console.error("Failed to create course type");
      }
    } catch (error) {
      console.error("Error creating course type:", error);
    }
  };

  return (
    <div>
      <h1>Add New Course Type</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="courseTypeDescription"
              value={formData.courseTypeDescription}
              onChange={handleChange}
              placeholder="Enter course type description"
              required
            />
          </label>
        </div>
        <button type="submit">Create Course Type</button>
      </form>
    </div>
  );
}

export default AddCourseTypeForm;
