import React, { useState, useEffect } from "react";

function AddRegistrationForm() {
  const [registrationData, setRegistrationData] = useState({
    registrationDate: "",
    delegateNo: "",
    courseFeeNo: "",
    courseNo: "",
  });
  const [delegates, setDelegates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseFees, setCourseFees] = useState([]);

  // Fetch delegates, courses, and course fees on component mount
  useEffect(() => {
    fetch("/api/delegates")
      .then((response) => response.json())
      .then((data) => setDelegates(data))
      .catch((error) => console.error("Error fetching delegates:", error));

    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));

    fetch("/api/courseFees")
      .then((response) => response.json())
      .then((data) => setCourseFees(data))
      .catch((error) => console.error("Error fetching course fees:", error));
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
      const response = await fetch("/api/registrations/createRegistration", {
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
        }); // Clear the form
      } else {
        alert("Failed to create registration");
      }
    } catch (error) {
      console.error("Error creating registration:", error);
    }
  };

  return (
    <div>
      <h1>Add New Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Registration Date:
            <input
              type="date"
              name="registrationDate"
              value={registrationData.registrationDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Delegate:
            <select
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
            </select>
          </label>
        </div>
        <div>
          <label>
            Course Fee:
            <select
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
            </select>
          </label>
        </div>
        <div>
          <label>
            Course:
            <select
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
            </select>
          </label>
        </div>
        <button type="submit">Create Registration</button>
      </form>
    </div>
  );
}

export default AddRegistrationForm;
