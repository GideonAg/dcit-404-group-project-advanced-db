import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_API } from "../utils";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API}/api/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => alert("Error fetching courses:", error));
  }, []);

  return (
    <div>
      <h1>Course List</h1>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Max Delegates</th>
            <th>Confirmed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseNo}>
              <td>{course.courseName}</td>
              <td>{course.courseDescription}</td>
              <td>{new Date(course.startDate).toLocaleDateString()}</td>
              <td>{new Date(course.endDate).toLocaleDateString()}</td>
              <td>{course.startTime}</td>
              <td>{course.endTime}</td>
              <td>{course.maxDelegates}</td>
              <td>{course.confirmed ? "Yes" : "No"}</td>
              <td>
                <Link to={`/courses/update/${course.courseNo}`}>Update</Link>
                <button onClick={() => handleDelete(course.courseNo)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(courseNo) {
    fetch(`${BASE_API}/api/courses/${courseNo}`, { method: "DELETE" })
      .then(() => {
        setCourses(courses.filter((course) => course.courseNo !== courseNo));
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error deleting the course!");
      });
  }
};

export default CourseList;
