import React, { useState } from "react";
import { BASE_API } from "../utils";

function AddLocationForm() {
  const [locationData, setLocationData] = useState({
    locationName: "",
    maxSize: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!locationData.locationName || !locationData.maxSize) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(BASE_API + "/api/createLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });
      if (response.ok) {
        alert.log("Location created successfully");
        setLocationData({
          locationName: "",
          maxSize: "",
        });
      } else {
        alert("Failed to create location");
      }
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  return (
    <div>
      <h1>Add New Location</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Location Name:
            <input
              type="text"
              name="locationName"
              value={locationData.locationName}
              onChange={handleChange}
              placeholder="Enter location name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Max Size:
            <input
              type="number"
              name="maxSize"
              value={locationData.maxSize}
              onChange={handleChange}
              placeholder="Enter maximum size"
              required
            />
          </label>
        </div>
        <button type="submit">Create Location</button>
      </form>
    </div>
  );
}

export default AddLocationForm;
