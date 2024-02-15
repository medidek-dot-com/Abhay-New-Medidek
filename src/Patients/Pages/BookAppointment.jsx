import React, { useEffect, useState } from "react";
import Dialog from "../../Common/Components/Dialogs/Dialog";
import { useSelector } from "react-redux";
import { H7 } from "../../Common/Components/Text/Textt";
import DoctorCard from "../Components/Find Doctors/DoctorCard";
import { axiosClient } from "../../Utils/axiosClient";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import PatientLogIn from "../../Common/Authentication/Patient/PatientLogIn";
import TestComponentForModel from "../Components/TestComponentForModel";

const BookAppointment = () => {
    const { doctorId } = useParams();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [doctorInfo, setDoctorInfo] = useState({});

    // const getSingleDoctorDetails = async () => {
    //     try {
    //         const response = await axiosClient.get(
    //             `/v2/singledoctor/${doctorId}`
    //         );

    //         console.log(response)

    //         // if (response.status === "ok") {
    //         //     setDuid(response.result.doctorid);
    //         //     setDoctorInfo(response.result);
    //         //     try {
    //         //         const hospitaList = await axiosClient.get(
    //         //             `/v2/multipleloginprofile/${response?.result?.doctorid}`
    //         //         );
    //         //         // if (hospitaList.status === "ok") {
    //         //         //     setHospitalList(hospitaList.result);
    //         //         // }
    //         //         return;
    //         //     } catch (error) {
    //         //         // setBookAppointmentButtonLoading(false);
    //         //         console.log(error);
    //         //     }
    //         // }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    // useEffect(()=>{
    //   getSingleDoctorDetails();
    // })

    return (
        <div className="overflow-x-hidden flex flex-col gap-5 relative min-h-[calc(100vh-108px)] mt-[40px] px-4 md:px-[24.74%] ">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>

            <H7 content="Enter Details" />
            <DoctorCard />
            <H7 content="Select a hospital" />

            <PatientLogIn />
        </div>
    );
};

export default BookAppointment;
