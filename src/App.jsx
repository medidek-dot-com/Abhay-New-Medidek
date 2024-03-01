import React, { memo, useEffect } from "react";
import Navbar from "./Common/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Patient from "./Patients/Patient";
import { KEY_ACCESS_TOKEN, getItem, removeItem } from "./Utils/localStorageManager";
import { logout } from "./Utils/Store/authSlice";


const App = () => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
   

    return (
        <div className="">
            <Navbar />
            {isLoggedIn && user?.role == "DOCTOR" && <Patient />}
            {isLoggedIn && user?.role == "MASTER" && <Patient />}
            {isLoggedIn && user?.role == "PATIENT" && <Patient />}
            {!isLoggedIn && !user && <Patient />}
        </div>
    );
};

export default memo(App);
