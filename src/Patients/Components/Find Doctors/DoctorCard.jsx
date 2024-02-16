import React, { memo, useCallback, useRef } from "react";
import Avatar from "../../../Common/Components/Avatar/Avatar";
import { H8, Span } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";

const DoctorCard = ({ doctorInfo, visible }) => {

    const ref = useRef();
    const navigate = useNavigate();

    const handleClick = useCallback((e)=>{
        if(e.target != ref.current){
            navigate(`/doctor-details/${doctorInfo?._id}`)
            return
        }
        navigate(`/doctor/${doctorInfo?._id}/book_appointment`)
    },[]);
    
    return (
        <div  onClick={handleClick} className="py-5 flex flex-col gap-3 md:gap-0 md:flex-row justify-between md:items-center border-y border-dashed border-[#B8B8BA99] cursor-pointer ">
            
            <div className="flex gap-[14px]">
                <Avatar
                    src={doctorInfo?.imgurl}
                    className={"w-[88px] h-[88px]"}
                />
                <div className="flex flex-col gap-[2px]">
                    <div className="flex flex-wrap gap-[5px] items-center">
                        <H8 content={doctorInfo?.nameOfTheDoctor} />
                        <Span content="|" />{" "}
                        <Span content={doctorInfo?.speciality} />
                    </div>
                    <Span
                        content={`${doctorInfo?.yearOfExprience} Years Experience`}
                    />
                    <Span
                        content={`₹${doctorInfo?.connsultationFee} Consultation fee `}
                    />
                    <div className="flex items-center gap-[5px]">
                        <img src="/Find Doctors/Location-2.svg" alt="img" />
                        <Span content={doctorInfo?.location} />
                    </div>
                    <Span content="114 Ratings" />
                </div>
            </div>
            
           {visible && <PrimaryButton
                className={"bg-c1 font-f2 font-w1 w-full md:w-[145px]"}
                w={"145px"}
                h={"45px"}
                bg={"c1"}
                color={"white"}
                radius={"44px"}
                content={"Book Now"}
                reff={ref}
            />}
        </div>
    );
};

export default memo(DoctorCard);
