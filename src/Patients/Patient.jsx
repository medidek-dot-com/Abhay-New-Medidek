import React, { memo, useCallback, useEffect } from "react";
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
import EditPatientProfile from "./Pages/EditPatientProfile";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
} from "../Utils/localStorageManager";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Utils/Store/authSlice";
import AppointmentContextProvider from "../Utils/Context/Patients/AppointmentContextProvider";

const Patient = () => {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    // {(isLoggedIn && user?.role == "DOCTOR" && <></>) ||

    const accessToken = getItem(KEY_ACCESS_TOKEN);

    useEffect(() => {
        if (!accessToken) {
            //   removeItem(KEY_ACCESS_TOKEN);

            dispatch(logout());
        }
    }, [accessToken]);

    return (
        <div>
            <AuthContextProvider>
                <AppointmentContextProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/find-doctors" element={<FindDoctors />} />
                        <Route
                            path="/doctor-details/:doctorId"
                            element={<DoctorDetails />}
                        />
                        <Route
                            path="/doctor/:doctorId/book_appointment"
                            element={<BookAppointment />}
                        />
                        <Route
                            path="/appointments"
                            element={<Appointments />}
                        />
                        <Route path="/records" element={<Records />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/our-team" element={<OurTeam />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route
                            path="/edit-profile"
                            element={<EditPatientProfile />}
                        />
                    </Routes>
                    <Footer />
                </AppointmentContextProvider>
            </AuthContextProvider>
        </div>
    );
};

export default Patient;
