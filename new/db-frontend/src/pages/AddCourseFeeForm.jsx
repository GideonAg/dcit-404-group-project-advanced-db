import React, { useState, useEffect } from "react";
import { BASE_API } from "../utils";

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
    <div>
      <h1>Add New Course Fee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="feeDescription"
              value={courseFeeData.feeDescription}
              onChange={handleChange}
              placeholder="Enter fee description"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Fee:
            <input
              type="number"
              name="fee"
              value={courseFeeData.fee}
              onChange={handleChange}
              placeholder="Enter fee amount"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Course:
            <select
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
            </select>
          </label>
        </div>
        <button type="submit">Create Course Fee</button>
      </form>
    </div>
  );
}

export default AddCourseFeeForm;
