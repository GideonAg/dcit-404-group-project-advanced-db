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
    try {
      const response = await fetch(`${BASE_API}/api/employees/${employeeNo}`);
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
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
    try {
      const response = await fetch(`${BASE_API}/api/employees/${employeeNo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        navigate("/employeeList");
      } else {
        console.error("Failed to update employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (loading) return <p>Loading employee details...</p>;

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
        Update Employee
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", color: "#555" }}>
            First Name:
          </label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", color: "#555" }}>
            Last Name:
          </label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", color: "#555" }}>
            Position:
          </label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#0073e6",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          type="submit"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
