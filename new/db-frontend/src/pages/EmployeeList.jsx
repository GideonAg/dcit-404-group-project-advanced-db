import React, { useState, useEffect } from "react";
import { BASE_API } from "../utils";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    const response = await fetch("/api/employees");
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

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} - {employee.position}
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
