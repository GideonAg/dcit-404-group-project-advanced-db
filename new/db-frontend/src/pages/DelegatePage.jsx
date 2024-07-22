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
      setDelegates(response.data);
      console.log(response.data);
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
    <div>
      <h1>Delegate Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="delegateFName"
          placeholder="First Name"
          value={newDelegate.delegateFName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="delegateLName"
          placeholder="Last Name"
          value={newDelegate.delegateLName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="delegateTitle"
          placeholder="Title of delegate"
          value={newDelegate.delegateTitle}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="delegateStreet"
          placeholder="Street of delegate"
          value={newDelegate.delegateStreet}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="delegateCity"
          placeholder="City of delegate"
          value={newDelegate.delegateCity}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="delegateState"
          placeholder="State of delegate"
          value={newDelegate.delegateState}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="delegateZipCode"
          placeholder="Zip code of delegate"
          value={newDelegate.delegateZipCode}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="attEmailAddress"
          placeholder="Email"
          value={newDelegate.attEmailAddress}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="attTelNo"
          placeholder="Phone Number"
          value={newDelegate.attTelNo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="attFaxNo"
          placeholder="Fax Number"
          value={newDelegate.attFaxNo}
          onChange={handleInputChange}
        />
        <div>
          <select
            name="clientNo"
            value={newDelegate.clientNo}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Client</option>
            {client.map((item) => (
              <option key={item.clientNo} value={item.clientNo}>
                {item.clientFName + "-" + item.clientLName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Delegate</button>
      </form>

      <h2>Delegates</h2>
      <ul>
        {delegates?.map((delegate) => (
          <li key={delegate.delegateId}>
            {delegate.delegateFName} {delegate.delegateLName} -{" "}
            {delegate.attEmailAddress}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DelegatePage;
