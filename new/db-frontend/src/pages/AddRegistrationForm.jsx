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

function AddRegistrationForm() {
  const [registrationData, setRegistrationData] = useState({
    registrationDate: "",
    delegateNo: "",
    courseFeeNo: "",
    courseNo: "",
    registerEmployeeNo: "",
  });
  const [delegates, setDelegates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseFees, setCourseFees] = useState([]);
  const [registerEmployees, setRegisterEmployees] = useState([]);

  useEffect(() => {
    fetch(BASE_API + "/api/delegates")
      .then((response) => response.json())
      .then((data) => setDelegates(data))
      .catch((error) => console.error("Error fetching delegates:", error));

    fetch(BASE_API + "/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));

    fetch(BASE_API + "/api/courseFee")
      .then((response) => response.json())
      .then((data) => setCourseFees(data))
      .catch((error) => console.error("Error fetching course fees:", error));

    fetch(BASE_API + "/api/employees")
      .then((response) => response.json())
      .then((data) => setRegisterEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(BASE_API + "/api/createRegistration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });
      if (response.ok) {
        alert("Registration created successfully");
        setRegistrationData({
          registrationDate: "",
          delegateNo: "",
          courseFeeNo: "",
          courseNo: "",
          registerEmployeeNo: "",
        });
      } else {
        alert("Failed to create registration");
      }
    } catch (error) {
      console.error("Error creating registration:", error);
    }
  };

  return (
    <Container>
      <Title>Add New Registration</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Registration Date:</Label>
          <Input
            type="date"
            name="registrationDate"
            value={registrationData.registrationDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Delegate:</Label>
          <Select
            name="delegateNo"
            value={registrationData.delegateNo}
            onChange={handleChange}
            required
          >
            <option value="">Select a Delegate</option>
            {delegates.map((delegate) => (
              <option key={delegate.delegateNo} value={delegate.delegateNo}>
                {delegate.delegateFName} {delegate.delegateLName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Course Fee:</Label>
          <Select
            name="courseFeeNo"
            value={registrationData.courseFeeNo}
            onChange={handleChange}
            required
          >
            <option value="">Select a Course Fee</option>
            {courseFees.map((fee) => (
              <option key={fee.courseFeeNo} value={fee.courseFeeNo}>
                {fee.feeDescription} - ${fee.fee}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Course:</Label>
          <Select
            name="courseNo"
            value={registrationData.courseNo}
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
        <FormGroup>
          <Label>Registering Employee:</Label>
          <Select
            name="registerEmployeeNo"
            value={registrationData.registerEmployeeNo}
            onChange={handleChange}
            required
          >
            <option value="">Select an Employee</option>
            {registerEmployees.map((employee) => (
              <option
                key={employee.employeeNo}
                value={employee.employeeNo}
              >
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit">Create Registration</Button>
      </Form>
    </Container>
  );
}

export default AddRegistrationForm;
