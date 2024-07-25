import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API } from "../utils";

function UpdateEmployee() {
  const { employeeNo } = useParams();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    position: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    setLoading(true);
    const response = await fetch(`${BASE_API}/api/employees/${employeeNo}`);
    const data = await response.json();
    setEmployee(data);
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_API}/api/employees/${employeeNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    if (response.ok) {
      navigate("/employeeList");
    }
  };

  if (loading) return <p>Loading employee details...</p>;

  return (
    <div>
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
