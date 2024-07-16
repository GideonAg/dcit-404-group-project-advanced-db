import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { BASE_API } from "../utils";

const CourseUpdateForm = () => {
  const { courseNo } = useParams();
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxDelegates: 0,
    confirmed: false,
  });

  useEffect(() => {
    fetch(`${BASE_API}/api/courses/${courseNo}`)
      .then((response) => setCourse(response.data))
      .catch((error) => {
        alert("There was an error fetching the course!", error);
      });
  }, [courseNo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_API}/api/courses/${courseNo}`, {
      body: JSON.stringify(course),
      method: "PUT",
    })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the course!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course Name:</label>
        <input
          type="text"
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Course Description:</label>
        <textarea
          name="courseDescription"
          value={course.courseDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={course.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={course.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={course.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Max Delegates:</label>
        <input
          type="number"
          name="maxDelegates"
          value={course.maxDelegates}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Confirmed:</label>
        <input
          type="checkbox"
          name="confirmed"
          checked={course.confirmed}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Course</button>
    </form>
  );
};

export default CourseUpdateForm;
