import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BASE_API } from "../utils";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

function CreateCourse() {
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxDelegates: "",
    confirmed: "",
    delivererEmployeeNo: "",
    courseTypeNo: "",
  });
  const [employees, setEmployees] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [employeesResponse, courseTypesResponse] = await Promise.all([
          fetch(BASE_API + "/api/employees"),
          fetch(BASE_API + "/api/courseTypes"),
        ]);

        const [employeesData, courseTypesData] = await Promise.all([
          employeesResponse.json(),
          courseTypesResponse.json(),
        ]);

        setEmployees(employeesData);
        setCourseTypes(courseTypesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_API + "/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      if (response.ok) {
        alert("Course created successfully");
        setCourse({
          courseName: "",
          courseDescription: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          maxDelegates: "",
          confirmed: true,
          delivererEmployeeNo: "",
          courseTypeNo: "",
        });
      } else {
        alert("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add Course</h1>
      <FormGroup>
        <Label>Course Name:</Label>
        <Input
          type="text"
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          placeholder="Course Name"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Course Description:</Label>
        <Textarea
          name="courseDescription"
          value={course.courseDescription}
          onChange={handleChange}
          placeholder="Course Description"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Start Date:</Label>
        <Input
          type="date"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Start Time:</Label>
        <Input
          type="time"
          name="startTime"
          value={course.startTime}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>End Date:</Label>
        <Input
          type="date"
          name="endDate"
          value={course.endDate}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>End Time:</Label>
        <Input
          type="time"
          name="endTime"
          value={course.endTime}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Max Delegates:</Label>
        <Input
          type="number"
          name="maxDelegates"
          value={course.maxDelegates}
          onChange={handleChange}
          placeholder="Max Delegates"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Employee:</Label>
        <Select
          name="delivererEmployeeNo"
          value={course.delivererEmployeeNo}
          onChange={handleChange}
          required
        >
          <option value="">Select Deliverer</option>
          {employees.map((emp) => (
            <option key={emp.employeeNo} value={emp.employeeNo}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Confirmed:</Label>
        <Select
          name="confirmed"
          value={course.confirmed}
          onChange={handleChange}
          required
        >
          <option value="">Select if confirmed</option>
          <option key={"T"} value={true}>
            True
          </option>
          <option key={"F"} value={false}>
            False
          </option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Course Type:</Label>
        <Select
          name="courseTypeNo"
          value={course.courseTypeNo}
          onChange={handleChange}
          required
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((type) => (
            <option key={type.courseTypeNo} value={type.courseTypeNo}>
              {type.courseTypeDescription}
            </option>
          ))}
        </Select>
      </FormGroup>
      <Button type="submit">Create Course</Button>
    </Form>
  );
}

export default CreateCourse;
