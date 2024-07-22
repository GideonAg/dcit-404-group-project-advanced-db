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

function AddBookingForm() {
  const [bookingData, setBookingData] = useState({
    bookingDate: "",
    locationNo: "",
    courseNo: "",
    bookingEmployeeNo: "",
  });
  const [locations, setLocations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch Locations, Courses, and Employees on component mount
  useEffect(() => {
    fetch(BASE_API + "/api/createLocation")
      .then((res) => res.json())
      .then(setLocations);
    fetch(BASE_API + "/api/courses")
      .then((res) => res.json())
      .then(setCourses);
    fetch(BASE_API + "/api/employees")
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(BASE_API + "/api/createBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (response.ok) {
        alert("Booking created successfully");
        setBookingData({
          bookingDate: "",
          locationNo: "",
          courseNo: "",
          bookingEmployeeNo: "",
        });
      } else {
        alert("Failed to create booking");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <Container>
      <Title>Add New Booking</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Booking Date:</Label>
          <Input
            type="date"
            name="bookingDate"
            value={bookingData.bookingDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Location:</Label>
          <Select
            name="locationNo"
            value={bookingData.locationNo}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.locationNo} value={location.locationNo}>
                {location.locationName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Course:</Label>
          <Select
            name="courseNo"
            value={bookingData.courseNo}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.courseNo} value={course.courseNo}>
                {course.courseName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Booking Employee:</Label>
          <Select
            name="bookingEmployeeNo"
            value={bookingData.bookingEmployeeNo}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.employeeNo} value={employee.employeeNo}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit">Create Booking</Button>
      </Form>
    </Container>
  );
}

export default AddBookingForm;
