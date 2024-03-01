import React, { memo, useCallback, useContext, useState } from "react";
import { ErrorSpan, H7, P2, P3 } from "../../../Common/Components/Text/Textt";
import BoxButton from "../../../Common/Components/Buttons/BoxButton";
import AppointmentContext from "../../../Utils/Context/Patients/AppointmentContext";

const SlotsCard = ({ data, selectedDate, setSelectedDate }) => {
    const [translate, setTranslate] = useState(0)
    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);
    const handlePrev = () => {
        setTranslate((prevVal)=>prevVal - 100)
    };
    const handleNext = () => {
        setTranslate((prevVal)=>prevVal + 100)
    };
console.log(appointmentBookingDetails)
    const handleSelectingDate = useCallback(
        (e, hospitalId) => {
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                appointmentDate: e.target.innerText,
                selectedHospital: hospitalId,
            });
        },
        [appointmentBookingDetails?.appointmentDate]
    );

    return (
        <div className="border-y flex flex-col gap-5 border-dashed py-5 border-c25">
            <div className="flex items-center gap-1">
                <H7 content={"Book Appointment"} />
                <P2
                    content={"(appointment by slots)"}
                    className={"font-w2 text-c22"}
                />
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={handlePrev} className="block md:hidden">{"<"}</button>
                <div className="flex w-[300%] gap-2.5 flex-nowrap md:flex-wrap overflow-hidden">
                    {data?.map((day, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-[5px]"
                        >
                            <BoxButton
                                content={day}
                                onclick={handleSelectingDate}
                                classname={`${appointmentBookingDetails?.appointmentDate == day ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] -translate-x-[${translate+'%'}]`}
                            />
                            {/* <ErrorSpan content={"Slot Booked"} /> */}
                        </div>
                    ))}
                </div>
                <button onClick={handleNext} className="block md:hidden">{">"}</button>
            </div>
            <P3 content={"8 Slots Available"} className={"text-[13px]"} />
            <div className="flex gap-x-2.5 gap-y-[25px] flex-wrap w-[90%] ">
                {Array.from({ length: 10 }).map((_, i) => (
                    <BoxButton
                        key={i}
                        content={"12:00 - 13:00"}
                        onclick={() => setSelectedDate(i)}
                        classname={`${selectedDate === i ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px]`}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(SlotsCard);
