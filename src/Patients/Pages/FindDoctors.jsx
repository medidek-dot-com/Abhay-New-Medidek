import React, { useEffect, useState, memo, useMemo } from "react";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import locationIcon from "/Find Doctors/Location-1.svg";
import searchIcon from "/Find Doctors/Search.svg";
import { H7 } from "../../Common/Components/Text/text";
import DoctorCard from "../Components/Find Doctors/DoctorCard";
import {axiosClient} from '../../Utils/axiosClient'
import { Link } from "react-router-dom";

const FindDoctors = () => {

    const [isloading, setIsLoading] = useState(false);
    const [location, setLocation] = useState("location");


    const [doctorsData, setDoctorsData] = useState([]);

    const [count, setCount] = useState(0);

    const getDoctorsList = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get("/v2/getusergetalldoctors");
            if (response.status === "ok") {
                setIsLoading(false);
                return setDoctorsData(response.result);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    };

    useEffect(()=>{
        getDoctorsList()
    },[]);
    


    return (
        <div className="overflow-x-hidden relative min-h-[calc(100vh-108px)] mt-[40px] px-4 md:px-[50px]">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="flex justify-center gap-[15px]">
                <Input2
                    type="text"
                    placeholder="Enter location"
                    name="location"
                    icon={locationIcon}
                    divClasses="w-[80%] md:w-[19.27%]"
                    onChange={(e)=>setLocation(e.target.value)}
                />

                <Input2
                    type="text"
                    placeholder="Type of doctor"
                    name="speciality "
                    icon={searchIcon}
                    divClasses="w-[100%] md:w-[26.10%]"
                />
               
            </div>
            <H7 content="188 dentists near you" className="my-6 md:mt-[50px] md:mb-[22px]" />
            {
                doctorsData?.map((doctorInfo)=>(
                    // <Link key={doctorInfo?._id} to={`/doctor-details/${doctorInfo?._id}`} >
                    <DoctorCard key={doctorInfo?._id} doctorInfo={doctorInfo} visible={true} />
                    // </Link>

                ))
            }
        </div>
    );
};

export default memo(FindDoctors);
