import React from "react";

export const Home = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    height: "100vh",
  };

  const titleStyle = {
    color: "#333",
    marginBottom: "20px",
  };

  const linkListStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    width: "100%",
    maxWidth: "800px",
  };

  const linkItemStyle = {
    display: "block",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    color: "#0073e6",
    textAlign: "center",
    border: "1px solid #0073e6",
    transition: "background-color 0.3s, color 0.3s",
  };

  const linkItemHoverStyle = {
    backgroundColor: "#0073e6",
    color: "#fff",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Navigate through the pages</h1>
      <div style={linkListStyle}>
        {[
          { href: "/course", text: "Add course" },
          { href: "/addEmployee", text: "Add employee" },
          { href: "/addCourseType", text: "Add course type" },
          { href: "/addLocation", text: "Add location" },
          { href: "/addBooking", text: "Add Booking" },
          { href: "/addCourseFee", text: "Add Course Fee" },
          { href: "/addInvoice", text: "Add Invoice" },
          { href: "/addRegistration", text: "Add Registration" },
          { href: "/addPayment", text: "Add Payment method" },
          { href: "/employeeList", text: "All employees" },
          { href: "/courseList", text: "All courses" },
          { href: "/addDelegate", text: "Delegate page" },
          { href: "/addClient", text: "Client page" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={linkItemStyle}
            onMouseOver={(e) =>
              Object.assign(e.currentTarget.style, linkItemHoverStyle)
            }
            onMouseOut={(e) =>
              Object.assign(e.currentTarget.style, linkItemStyle)
            }
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};
