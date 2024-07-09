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

function AddCourseFeeForm() {
  const [courseFeeData, setCourseFeeData] = useState({
    feeDescription: "",
    fee: "",
    courseNo: "",
  });
  const [courses, setCourses] = useState([]);

  // Fetch Courses on component mount
  useEffect(() => {
    fetch(BASE_API + "/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => alert("Error fetching courses:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseFeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!courseFeeData.courseNo) {
      alert("Please select a course.");
      return;
    }

    try {
      const response = await fetch(BASE_API + "/api/createCourseFee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseFeeData),
      });
      if (response.ok) {
        alert("Course Fee created successfully");
        setCourseFeeData({ feeDescription: "", fee: "", courseNo: "" }); // Clear the form
      } else {
        alert("Failed to create course fee");
      }
    } catch (error) {
      console.error("Error creating course fee:", error);
    }
  };

  return (
    <Container>
      <Title>Add New Course Fee</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Description:</Label>
          <Input
            type="text"
            name="feeDescription"
            value={courseFeeData.feeDescription}
            onChange={handleChange}
            placeholder="Enter fee description"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Fee:</Label>
          <Input
            type="number"
            name="fee"
            value={courseFeeData.fee}
            onChange={handleChange}
            placeholder="Enter fee amount"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Course:</Label>
          <Select
            name="courseNo"
            value={courseFeeData.courseNo}
            onChange={handleChange}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.courseNo} value={course.courseNo}>
                {course.courseName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit">Create Course Fee</Button>
      </Form>
    </Container>
  );
}

export default AddCourseFeeForm;
