import React, { useState, useEffect } from "react";
import { BASE_API } from "../utils";

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
    fetch(BASE_API + "/api/locations")
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
      const response = await fetch(BASE_API + "/api/bookings/createBooking", {
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
    <div>
      <h1>Add New Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Booking Date:
            <input
              type="date"
              name="bookingDate"
              value={bookingData.bookingDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <select
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
            </select>
          </label>
        </div>
        <div>
          <label>
            Course:
            <select
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
            </select>
          </label>
        </div>
        <div>
          <label>
            Booking Employee:
            <select
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
            </select>
          </label>
        </div>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}

export default AddBookingForm;
