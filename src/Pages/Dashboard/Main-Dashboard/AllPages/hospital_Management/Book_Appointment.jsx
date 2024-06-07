import React, { useState } from "react";
import { CommonProblem } from "./MixedObjectData";
import "./CSS/Book_appointment.css";
import { useDispatch } from "react-redux";
import { AddPatients, CreateBooking } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Book_appointment.css";
import './CSS/CreatePatientProfile.css'

const notify = (text) => toast(text);

const Book_Appointment = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const InitValue = {
    patientName: "",
    age: "",
    gender: "",
    mobile: "",
    disease: "",
    address: "",
    email: "",
    department: "",
    date: "",
    time: "",
  };

  const [BookAppoint, setBookAppoint] = useState(InitValue);

  const HandleAppointment = (e) => {
    setBookAppoint({ ...BookAppoint, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();

    if (BookAppoint.gender === "" || BookAppoint.department === "") {
      return notify("Please fill all the Details");
    }
    setLoading(true);
    dispatch(AddPatients({ ...BookAppoint, patientId: Date.now() })).then(
      (res) => {
        let data = {
          ...BookAppoint,
          patientId: res.id,
        };
        dispatch(CreateBooking(data));
        notify("Appointment Booked");
        setLoading(false);
        setBookAppoint(InitValue);
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="container  p-4">
        <Sidebar />
        <div className="AfterSideBar bg-blue-300 p-6 rounded-lg shadow-lg">
          <div className="Main_Add_Doctor_div">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Book Appointment</h1>
            <form onSubmit={HandleOnsubmitAppointment} className="space-y-4">
              {/* Name Placeholder */}
              <div>
                <label className="text-red-400 font-semibold">Patient Name</label>
                <div className="inputdiv mt-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="patientName"
                    value={BookAppoint.patientName}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {/* Age Placeholder */}
              <div>
                <label className="font-semibold">Age</label>
                <div className="inputdiv mt-1">
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={BookAppoint.age}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {/* Gender Placeholder */}
              <div>
                <label className="font-semibold">Gender</label>
                <div className="inputdiv mt-1">
                  <select
                    name="gender"
                    value={BookAppoint.gender}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Choose Blood Group">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {/* Mobile Placeholder */}
              <div>
                <label className="font-semibold">Contact Number</label>
                <div className="inputdiv mt-1">
                  <input
                    type="number"
                    placeholder="Number"
                    name="mobile"
                    value={BookAppoint.mobile}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {/* Email Placeholder */}
              <div>
                <label className="font-semibold">Email</label>
                <div className="inputdiv mt-1">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    value={BookAppoint.email}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {/* Problem Placeholder */}
              <div>
                <label className="font-semibold">Type of Disease</label>
                <div className="inputdiv mt-1">
                  <select
                    name="disease"
                    value={BookAppoint.disease}
                    onChange={(e) => {
                      HandleAppointment(e);
                    }}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Choose Blood Group">Select Disease</option>
                    {CommonProblem.map((ele, i) => {
                      return (
                        <option key={i} value={ele.title}>
                          {ele.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/* Address Section */}
              <div>
                <label className="font-semibold">Address</label>
                <div className="inputdiv mt-1">
                  <input
                    type="text"
                    placeholder="Address line 1"
                    name="address"
                    value={BookAppoint.address}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {/* Department Section */}
              <div>
                <label className="font-semibold">Department</label>
                <div className="inputdiv mt-1">
                  <select
                    name="department"
                    value={BookAppoint.department}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>
              </div>
              {/* Appointment Date */}
              <div className="dateofAppointment">
                <p className="font-semibold">Date and Time</p>
                <div className="inputdiv mt-1 flex space-x-4">
                  <input
                    type={"date"}
                    placeholder="Choose Date"
                    name="date"
                    value={BookAppoint.date}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type={"time"}
                    placeholder="Choose Time"
                    name="time"
                    value={BookAppoint.time}
                    onChange={HandleAppointment}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <button type="submit" className="book_formsubmitbutton bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
                {Loading ? "Loading..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book_Appointment;
