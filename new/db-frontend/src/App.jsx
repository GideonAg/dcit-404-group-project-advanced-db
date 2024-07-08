import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCourse from "./pages/CreateCourse";
import AddEmployeeForm from "./pages/AddEmployeeForm";
import AddCourseTypeForm from "./pages/AddCourseTypeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/course" element={<CreateCourse />} />
        <Route path="/addEmployee" element={<AddEmployeeForm />} />
        <Route path="/addCourseType" element={<AddCourseTypeForm />} />
      </Routes>
      Hi there
    </BrowserRouter>
  );
}

export default App;
