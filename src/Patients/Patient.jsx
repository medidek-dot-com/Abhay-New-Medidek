import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import FindDoctors from "./Pages/FindDoctors";
import Appointments from "./Pages/Appointments";
import Records from "./Pages/Records";
import ContactUs from "./Pages/ContactUs";
import OurTeam from "./Pages/OurTeam";
import Blogs from "./Pages/Blogs";
import Footer from "../Common/Footer/Footer";
import DoctorDetails from "./Pages/DoctorDetails";
import BookAppointment from "./Pages/BookAppointment";
import AuthContextProvider from "../Utils/Context/Patients/AuthContextProvider";

const Patient = () => {
    return (
        <div>
            <AuthContextProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/find-doctors" element={<FindDoctors />} />
                <Route path="/doctor-details/:doctorId" element={<DoctorDetails />} />
                <Route path="/doctor/:doctorId/book_appointment" element={<BookAppointment />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/records" element={<Records />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/blogs" element={<Blogs />} />
            </Routes>
            <Footer />
            </AuthContextProvider>
        </div>
    );
};

export default memo(Patient);
