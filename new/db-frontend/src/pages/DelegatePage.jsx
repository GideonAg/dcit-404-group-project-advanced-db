import { useState, useEffect } from "react";
import { BASE_API } from "../utils";

const DelegatePage = () => {
  const [delegates, setDelegates] = useState([]);
  const [newDelegate, setNewDelegate] = useState({
    delegateFName: "",
    delegateLName: "",
    attEmailAddress: "",
    phoneNumber: "",
    delegateTitle: "",
    delegateStreet: "",
    delegateCity: "",
    delegateState: "",
    delegateZipCode: "",
    attTelNo: "",
    attFaxNo: "",
    clientNo: "",
  });
  const [client, setClient] = useState([]);

  useEffect(() => {
    fetchDelegates();
    fetch(BASE_API + "/api/client")
      .then((res) => res.json())
      .then(setClient);
  }, []);

  const fetchDelegates = async () => {
    try {
      const response = await fetch(BASE_API + "/api/delegates");
      const data = await response.json();
      setDelegates(data);
    } catch (error) {
      console.error("Error fetching delegates:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelegate({ ...newDelegate, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(BASE_API + "/api/delegates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDelegate),
      });
      fetchDelegates();
      alert("Delegate added successfully");
    } catch (error) {
      console.error("Error adding delegate:", error);
      alert("Failed to add delegate");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
          padding: "20px",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <h1 style={{ gridColumn: "span 6", textAlign: "center" }}>
          Delegate Management
        </h1>

        <div
          style={{
            gridColumn: "span 6",
            backgroundColor: "#f0f8ff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Add New Delegate</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <input
              type="text"
              name="delegateFName"
              placeholder="First Name"
              value={newDelegate.delegateFName}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 1",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="delegateLName"
              placeholder="Last Name"
              value={newDelegate.delegateLName}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 1",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="delegateTitle"
              placeholder="Title of delegate"
              value={newDelegate.delegateTitle}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 2",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="delegateStreet"
              placeholder="Street of delegate"
              value={newDelegate.delegateStreet}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 2",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="delegateCity"
              placeholder="City of delegate"
              value={newDelegate.delegateCity}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 1",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="delegateState"
              placeholder="State of delegate"
              value={newDelegate.delegateState}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 1",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="delegateZipCode"
              placeholder="Zip code of delegate"
              value={newDelegate.delegateZipCode}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 2",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="email"
              name="attEmailAddress"
              placeholder="Email"
              value={newDelegate.attEmailAddress}
              onChange={handleInputChange}
              required
              style={{
                gridColumn: "span 2",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="attTelNo"
              placeholder="Phone Number"
              value={newDelegate.attTelNo}
              onChange={handleInputChange}
              style={{
                gridColumn: "span 1",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="attFaxNo"
              placeholder="Fax Number"
              value={newDelegate.attFaxNo}
              onChange={handleInputChange}
              style={{
                gridColumn: "span 1",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            <div style={{ gridColumn: "span 2" }}>
              <select
                name="clientNo"
                value={newDelegate.clientNo}
                onChange={handleInputChange}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
              >
                <option value="">Select Client</option>
                {client.map((item) => (
                  <option key={item.clientNo} value={item.clientNo}>
                    {item.clientFName + "-" + item.clientLName}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              style={{
                gridColumn: "span 2",
                justifySelf: "center",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "12px",
                borderRadius: "4px",
                cursor: "pointer",
                border: "none",
                fontSize: "16px",
              }}
            >
              Add Delegate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DelegatePage;
