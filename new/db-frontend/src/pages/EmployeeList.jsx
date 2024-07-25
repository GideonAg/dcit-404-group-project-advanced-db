import { useState, useEffect } from "react";
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
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.employeeNo}>
            {employee.firstName} {employee.lastName} - {employee.position}
            <button onClick={() => handleDelete(employee.employeeNo)}>
              Delete
            </button>
            <button onClick={() => handleUpdate(employee.employeeNo)}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
