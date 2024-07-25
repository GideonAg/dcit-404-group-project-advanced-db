import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router
import { BASE_API } from "../utils";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    const response = await fetch(BASE_API + "/api/employees");
    const data = await response.json();
    setEmployees(data);
    setLoading(false);
  };

  const handleDelete = async (employeeId) => {
    const response = await fetch(`${BASE_API}/api/employees/${employeeId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchEmployees();
    }
  };

  const handleUpdate = (employeeId) => {
    navigate(`/update-employee/${employeeId}`);
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Employees
      </h1>
      <ul
        style={{
          listStyleType: "none",
          padding: "0",
        }}
      >
        {employees.map((employee) => (
          <li
            key={employee.employeeNo}
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              {employee.firstName} {employee.lastName} - {employee.position}
            </div>
            <div>
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(employee.employeeNo)}
              >
                Delete
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={() => handleUpdate(employee.employeeNo)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
