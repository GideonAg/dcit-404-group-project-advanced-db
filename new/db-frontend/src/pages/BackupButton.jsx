import styled from "styled-components";
import { BASE_API } from "../utils";

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #0073e6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const BackupButton = () => {
  const handleBackup = async () => {
    try {
      const response = await fetch(BASE_API + "/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        alert("Backup created successfully");
      } else {
        console.log(response);
        alert("Failed to create backup");
      }
    } catch (error) {
      console.error("Error creating backup:", error);
      alert("Error creating backup");
    }
  };

  return <Button onClick={handleBackup}>Backup Database</Button>;
};

export default BackupButton;
