import { useState, useEffect } from "react";

function CreateCourse() {
  const [course, setCourse] = useState({
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
  const [employees, setEmployees] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);

  useEffect(() => {
    // Fetch Employees
    async function fetchEmployees() {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
    }

    // Fetch Course Types
    async function fetchCourseTypes() {
      const response = await fetch("/api/courseTypes");
      const data = await response.json();
      setCourseTypes(data);
    }

    fetchEmployees();
    fetchCourseTypes();
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
      const response = await fetch("/api/createCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      if (response.ok) {
        alert("Course created successfully");
      } else {
        alert("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>ADD COURSE</h1>
      <div>
        Course name
        <input
          type="text"
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          placeholder="Course Name"
        />
      </div>
      <div>
        Course description
        <textarea
          name="courseDescription"
          value={course.courseDescription}
          onChange={handleChange}
          placeholder="Course Description"
        ></textarea>
      </div>
      <div>
        Start date
        <input
          type="date"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          placeholder="Start date"
        />
      </div>
      <div>
        Start time
        <input
          type="date"
          name="startTime"
          value={course.startTime}
          onChange={handleChange}
          placeholder="Start date"
        />
      </div>
      <div>
        End date
        <input
          type="date"
          name="endDate"
          value={course.endDate}
          onChange={handleChange}
          placeholder="Start date"
        />
      </div>
      <div>
        End time
        <input
          type="date"
          name="endTime"
          value={course.endTime}
          onChange={handleChange}
          placeholder="Start date"
        />
      </div>
      <div>
        Max delegate
        <input
          type="number"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          placeholder="Start date"
        />
      </div>
      <div>
        Employee
        <select
          name="delivererEmployeeNo"
          value={course.delivererEmployeeNo}
          onChange={handleChange}
        >
          <option value="">Select Deliverer</option>
          {employees.map((emp) => (
            <option key={emp.employeeNo} value={emp.employeeNo}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        Course Type
        <select
          name="courseTypeNo"
          value={course.courseTypeNo}
          onChange={handleChange}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((type) => (
            <option key={type.courseTypeNo} value={type.courseTypeNo}>
              {type.courseTypeDescription}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create Course</button>
    </form>
  );
}

export default CreateCourse;
