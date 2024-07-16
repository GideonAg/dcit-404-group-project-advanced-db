import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCourse from "./pages/CreateCourse";
import AddEmployeeForm from "./pages/AddEmployeeForm";
import AddCourseTypeForm from "./pages/AddCourseTypeForm";
import { Home } from "./pages/Home";
import AddLocationForm from "./pages/AddLocationForm";
import AddBookingForm from "./pages/AddBookingForm";
import AddCourseFeeForm from "./pages/AddCourseFeeForm";
import AddInvoiceForm from "./pages/AddInvoiceForm";
import AddRegistrationForm from "./pages/AddRegistrationForm";
import AddPaymentMethodForm from "./pages/AddPaymentMethodForm";
import EmployeeList from "./pages/EmployeeList";
import CourseList from "./pages/CourseList";
import CourseUpdateForm from "./pages/CourseUpdateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<CreateCourse />} />
        <Route path="/addEmployee" element={<AddEmployeeForm />} />
        <Route path="/addCourseType" element={<AddCourseTypeForm />} />
        <Route path="/addLocation" element={<AddLocationForm />} />
        <Route path="/addBooking" element={<AddBookingForm />} />
        <Route path="/addCourseFee" element={<AddCourseFeeForm />} />
        <Route path="/addInvoice" element={<AddInvoiceForm />} />
        <Route path="/addRegistration" element={<AddRegistrationForm />} />
        <Route path="/addPayment" element={<AddPaymentMethodForm />} />
        <Route path="/employeeList" element={<EmployeeList />} />
        <Route path="/courseList" element={<CourseList />} />
        <Route
          path="/courses/update/:courseNo"
          element={<CourseUpdateForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
