import React from "react";
import { Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Dashboard/Dashboard-Login/DLogin";
import AllReport from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/AllReport";
import CreatePatientProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/CreatePatientProfile";
import AddAppointments from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/AddAppointment";
import Patient_Details from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Patient_Details";
import Add_Patient from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Add_Patient";
import Book_Appointment from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Book_Appointment";

import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";
import MyCalendar from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/MyCalendar";
import ViewAndUpdatePatient from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/View&UpdatePatientRecord";
import Precautions from "../Pages/Dashboard/Main-Dashboard/AllPages/Patient/Precautions";
// import Gemini from '../Pages/Dashboard/Main-Dashboard/AllPages/Patient/Gemini';
// Change this import statement in AllRoutes.jsx
import Gemini from '../Pages/Dashboard/Main-Dashboard/AllPages/Patient/gemini';



const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<ViewAndUpdatePatient />} /> */}
        {/* <Route path="/" element={<Add_Patient />} /> */}
        <Route path="/" element={<CreatePatientProfile />} />
        <Route path="/Gemini" element={<Gemini />} />
        {/* <Route path="/" element={<AddAppointments />} /> */}
        {/* <Route path="/" element={<FrontPage />} /> */}
        {/* <Route path="/" element={<Precautions healthIssue="Heart Attack" />} /> */}
        {/* <Route path="/dashboard" element={<FrontPage />} /> */}
        ******************** hospital_Management Part *************************
        <Route path="/reports" element={<AllReport />} />
        <Route path="/addappointment" element={<AddAppointments />} />
        <Route path="/createslip" element={<CreatePatientProfile />} />
        <Route path="/patientdetails" element={<Patient_Details />} />
        ******************** hospital_Management Part ************************
        <Route path="/addpatient" element={<Add_Patient />} />
        <Route path="/bookappointment" element={<Book_Appointment />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/precautions/:healthIssue" element={<Precautions />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
