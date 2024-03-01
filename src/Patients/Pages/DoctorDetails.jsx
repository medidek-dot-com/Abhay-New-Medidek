import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import DoctorCard from "../Components/Find Doctors/DoctorCard";
import { useParams } from "react-router-dom";
import PatientLogIn from "../Components/Authentication/PatientLogIn";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import {
    FormSpan,
    LinkText,
    LinkTextWithIcon,
    P3,
    Span,
} from "../../Common/Components/Text/Textt";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import moment from "moment";
import BoxButton from "../../Common/Components/Buttons/BoxButton";
import RatingCard from "../../Common/Components/Cards/RatingCard";
import AppointmentContext from "../../Utils/Context/Patients/AppointmentContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import LoadingDots from "../../Common/Components/Animation/LoadingDots/LoadingDots";
import {
    INITIAL_STATE,
    doctorsReducer,
} from "../Reducers/DoctorDetails/doctorDetailReducer";
import { ACTION_TYPES } from "../Reducers/DoctorDetails/ActionsType";

const DoctorDetails = () => {
    const { doctorId } = useParams();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [state, dispatch] = useReducer(doctorsReducer, INITIAL_STATE);
    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);

    const handlePrev = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= state.dates.length) {
            newIndex = state.dates.length - 1;
        }
        dispatch({ type: ACTION_TYPES.SET_TRANSLATE, payload: newIndex });
    };
    const handleNext = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= state.dates.length) {
            newIndex = state.dates.length - 1;
        }
        dispatch({ type: ACTION_TYPES.SET_TRANSLATE, payload: newIndex });
    };

    const handleSelectingDate = useCallback(
        (e, hospitalId) => {
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                appointmentDate: e.target.innerText,
            });
        },
        [appointmentBookingDetails?.appointmentDate]
    );
    const handleSelectingSlot = useCallback(
        (slot) => {
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                AppointmentTime: slot,
            });
        },
        [appointmentBookingDetails?.appointmentDate]
    );

    const getAvailableSlots = async () => {
        setAppointmentBookingDetails({
            ...appointmentBookingDetails,
            AppointmentTime: "",
        });
        try {
            if (state.showTimeSlot != 0) {
                dispatch({ type: ACTION_TYPES.SLOT_API_PENDING });
                // setSlotsLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAvailbleSlotsForAnUser/${state.showTimeSlot}/${moment(appointmentBookingDetails.appointmentDate, "DD MMM, ddd").format("YYYY-MM-DD")}`
                );
                if (response.status === "ok") {
                    if (
                        response.result[0] ==
                        "doctor not available for this date"
                    ) {
                        return dispatch({
                            type: ACTION_TYPES.SLOT_API_NOT_AVAILABLE,
                        });
                    }
                    return dispatch({
                        type: ACTION_TYPES.SLOT_API_COMPLETE,
                        payload: response.result,
                    });
                }
            }
        } catch (error) {
            return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
            console.log(error.message);
        } finally {
            return dispatch({ type: ACTION_TYPES.SLOT_API_ERROR });
        }
    };

    const handleShowTimeSlot = (doctorId) => {
        if (state.showTimeSlot != doctorId) {
            dispatch({
                type: ACTION_TYPES.SET_SHOW_TIME_SLOT,
                payload: doctorId,
            });
            // setShowTimeSlot(doctorId);
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                selectedHospital: doctorId,
            });
        } else {
            dispatch({ type: ACTION_TYPES.SET_SHOW_TIME_SLOT, payload: 0 });
            setAppointmentBookingDetails({
                ...appointmentBookingDetails,
                selectedHospital: "",
            });
        }
    };

    useEffect(() => {
        if (state.showTimeSlot != 0) {
            getAvailableSlots();
        }
    }, [state.showTimeSlot, appointmentBookingDetails?.appointmentDate]);

    const getSingleDoctorDetails = async () => {
        console.log("renderrrrrrr");
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorId}`
            );
            if (response.status === "ok") {
                dispatch({
                    type: ACTION_TYPES.SET_DOCTOR_INFO,
                    payload: response.result,
                });
                // setDoctorInfo(response.result);
                response.result;
                try {
                    const hospitaList = await axiosClient.get(
                        `/v2/multipleloginprofile/${response?.result?.doctorid}`
                    );
                    if (hospitaList.status === "ok") {
                        dispatch({
                            type: ACTION_TYPES.SET_HOSPITAL_LIST,
                            payload: hospitaList.result,
                        });
                    }
                    return;
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getSingleDoctorDetails();
    }, [doctorId]);

    useEffect(() => {
        generateNextWeekDates();
    }, []);

    const generateNextWeekDates = () => {
        const datesArray = [];
        let currentDate = moment();

        for (let i = 0; i < 7; i++) {
            datesArray.push(currentDate.format("DD MMM, ddd"));
            currentDate = currentDate.add(1, "days");
        }
        dispatch({ type: ACTION_TYPES.SET_DATES, payload: datesArray });
    };

    return (
        <div className="overflow-x-hidden flex gap-5 relative min-h-[calc(100vh-108px)] my-[40px] px-4 md:px-[50px]">
            {/* <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div> */}
            <main className="w-full md:w-[68.16%] flex flex-col gap-5 ">
                <P3 content="Doctor’s Profile" className={"text-[15px]"} />
                <DoctorCard
                    doctorInfo={state.doctorInfo}
                    discreption={true}
                    clickble={false}
                    fullDiscreption={true}
                    hideInSm={true}
                    verified={true}
                    className="border border-solid border-c17 px-5 py-[17px]"
                />
                {/* Mobile screen hospital list from here */}
                <div className="w-full block md:hidden">
                    <P3 content="Hospitals List" className={"text-[15px]"} />
                    <div className=" border border-solid border-c17 px-5 pt-[12px] mt-5 rounded-[5px]">
                        {state.hospitalList?.map((hospital, i) => (
                            <div
                                key={hospital?._id}
                                className="border-b border-dashed border-c17 pt-3"
                            >
                                <div className="flex gap-2.5">
                                    <Avatar
                                        src={hospital?.imgurl}
                                        className={"w-[55px] h-[55px]"}
                                    />
                                    <div>
                                        <P3
                                            content={
                                                hospital?.hospitalId === null
                                                    ? hospital?.nameOfTheDoctor
                                                    : hospital?.hospitalId
                                                          ?.nameOfhospitalOrClinic
                                            }
                                            className={"text-[13px]"}
                                        />
                                        <div className="flex items-center">
                                            <img
                                                src="/Find Doctors/ConsultationCharges.svg"
                                                alt="icon"
                                                className="w-[8px]"
                                            />
                                            <Span
                                                content={
                                                    hospital?.connsultationFee
                                                }
                                                className={
                                                    "text-[#353535] text-[13px]"
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-[5px] w-[90%]">
                                            <img
                                                src="/Find Doctors/Vector@2x.png"
                                                alt="img"
                                                className="w-[10px]"
                                            />
                                            <Span
                                                content={
                                                    state.doctorInfo?.location
                                                }
                                            />
                                        </div>
                                        <div
                                            onClick={() =>
                                                dispatch({
                                                    type: ACTION_TYPES.SET_SHOW_TIME_SLOT,
                                                    payload:
                                                        state.showTimeSlot ==
                                                        hospital?._id
                                                            ? 0
                                                            : hospital?._id,
                                                })
                                            }
                                            className="flex items-center gap-[5px] mt-2 mb-3 select-none"
                                        >
                                            <FormSpan content="Pick a Time Slot" />
                                            {state.showTimeSlot ==
                                            hospital?._id ? (
                                                <FaAngleUp
                                                    color="#108ED6"
                                                    size={17.61}
                                                    className="mt-1"
                                                />
                                            ) : (
                                                <FaAngleDown
                                                    color="#108ED6"
                                                    size={17.61}
                                                    className="mt-1"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {state.showTimeSlot == hospital?._id && (
                                    <div className="py-5 flex flex-col gap-[15px] border-y border-dashed">
                                        <div className="flex w-full gap-2 items-center">
                                            <button
                                                onClick={() =>
                                                    handlePrev(translate - 1)
                                                }
                                                className="block"
                                            >
                                                {"<"}
                                            </button>
                                            <div className="flex flex-1 snap-x snap-mandatory overflow-x-auto no-scrollbar gap-2.5">
                                                {state.dates?.map((day, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex flex-col snap-always snap-center items-center gap-[5px]"
                                                    >
                                                        <BoxButton
                                                            content={day}
                                                            onclick={
                                                                handleSelectingDate
                                                            }
                                                            style={{
                                                                transform: `translate(-${state.translate * 100}%)`,
                                                            }}
                                                            classname={`${appointmentBookingDetails?.appointmentDate == day ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] transition-transform`}
                                                        />
                                                        {/* <ErrorSpan content={"Slot Booked"} /> */}
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleNext(
                                                        state.translate + 1
                                                    )
                                                }
                                                className="block"
                                            >
                                                {">"}
                                            </button>
                                        </div>
                                        <P3
                                            content="6 Slots Available"
                                            className={"text-[10px]"}
                                        />
                                        <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap">
                                            {Array.from({ length: 10 }).map(
                                                (_, i) => (
                                                    <BoxButton
                                                        key={i}
                                                        content={
                                                            "12:00 - 13:00"
                                                        }
                                                        onclick={() =>
                                                            dispatch({
                                                                type: ACTION_TYPES.SET_SELECTED_DATE,
                                                            })
                                                        }
                                                        classname={`${state.selectedDate === i ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px] `}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mobile screen hospital list to here */}

                <div className="flex gap-2.5">
                    <PrimaryButton
                        content={"Reviews"}
                        className={`${state.services ? "bg-c2 text-c28 border border-c22" : "bg-c1 text-c2"} font-f2 w-[129px]`}
                        h={"40px"}
                        bg={"c1"}
                        radius={"44px"}
                        onclick={() =>
                            dispatch({
                                type: ACTION_TYPES.SET_SERVICES,
                                payload: false,
                            })
                        }
                    />
                    <PrimaryButton
                        content={"Services"}
                        className={`${state.services ? "bg-c1 text-c2" : "bg-c2 text-c28 border border-c22"} font-f2 w-[129px] border border-c26 `}
                        h={"40px"}
                        bg={"c1"}
                        // color={"c22"}
                        radius={"44px"}
                        onclick={() =>
                            dispatch({
                                type: ACTION_TYPES.SET_SERVICES,
                                payload: true,
                            })
                        }
                    />
                </div>
                {state.services ? (
                    <div className="flex flex-col gap-[20px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <p
                                key={i}
                                className="text-c16 font-f3 font-w1 text-[13px]"
                            >
                                {i + 1}. Root Canal
                            </p>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-5 h-[500px] overflow-scroll no-scrollbar">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <RatingCard key={i} />
                        ))}
                    </div>
                )}
            </main>
            {/* Large screen hospital List From here  */}
            <aside className="w-[31.84%] hidden md:block">
                <P3 content="Hospitals List" className={"text-[15px]"} />

                <div className=" border border-solid border-c17 px-5 pt-[12px] mt-5 rounded-[5px]">
                    {state.hospitalList?.map((hospital, i) => (
                        <div
                            key={hospital?._id}
                            className="border-b border-dashed border-c17 pt-3"
                        >
                            <div className="flex gap-2.5">
                                <Avatar
                                    src={hospital?.imgurl}
                                    className={"w-[55px] h-[55px]"}
                                />
                                <div className="w-full">
                                    <P3
                                        content={
                                            hospital?.hospitalId === null
                                                ? hospital?.nameOfTheDoctor
                                                : hospital?.hospitalId
                                                      ?.nameOfhospitalOrClinic
                                        }
                                        className={"text-[13px]"}
                                    />
                                    <div className="flex items-center">
                                        <img
                                            src="/Find Doctors/ConsultationCharges.svg"
                                            alt="icon"
                                            className="w-[8px]"
                                        />
                                        <Span
                                            content={hospital?.connsultationFee}
                                            className={
                                                "text-[#353535] text-[13px]"
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center gap-[5px] w-[90%]">
                                        <img
                                            src="/Find Doctors/Vector@2x.png"
                                            alt="img"
                                            className="w-[10px]"
                                        />
                                        <Span
                                            content={
                                                hospital?.hospitalId === null
                                                    ? hospital?.location
                                                    : hospital?.hospitalId
                                                          ?.location
                                            }
                                        />
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleShowTimeSlot(hospital?._id)
                                        }
                                        className="flex items-center gap-[5px] mt-2 mb-3 select-none"
                                    >
                                        <FormSpan content="Pick a Time Slot" />
                                        {state.showTimeSlot == hospital?._id ? (
                                            <FaAngleUp
                                                color="#108ED6"
                                                size={17.61}
                                                className="mt-1"
                                            />
                                        ) : (
                                            <FaAngleDown
                                                color="#108ED6"
                                                size={17.61}
                                                className="mt-1"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {state.showTimeSlot == hospital?._id && (
                                <div className="py-5 flex flex-col gap-[15px] border-y border-dashed min-h-[100px]">
                                    <div className="flex w-full gap-2 items-center">
                                        <button
                                            onClick={() =>
                                                handlePrev(state.translate - 1)
                                            }
                                            className="block"
                                        >
                                            <FaAngleLeft color="#108ED6" />
                                        </button>
                                        <div className="flex flex-1 snap-x snap-mandatory overflow-x-auto no-scrollbar gap-2.5">
                                            {state.dates?.map((day) => (
                                                <div
                                                    key={day}
                                                    className="flex flex-col snap-always snap-center items-center gap-[5px]"
                                                >
                                                    <BoxButton
                                                        content={day}
                                                        onclick={(e) =>
                                                            handleSelectingDate(
                                                                e,
                                                                hospital?._id
                                                            )
                                                        }
                                                        style={{
                                                            transform: `translate(-${state.translate * 100}%)`,
                                                        }}
                                                        classname={`${appointmentBookingDetails?.appointmentDate == day && state.showTimeSlot == hospital?._id ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[87.84px] md:w-[110px] transition-transform`}
                                                    />
                                                    {/* <ErrorSpan content={"Slot Booked"} /> */}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleNext(state.translate + 1)
                                            }
                                            className="block"
                                        >
                                            <FaAngleRight color="#108ED6" />
                                        </button>
                                    </div>
                                    {state.slotsLoading ? (
                                        <LoadingDots />
                                    ) : state.doctorNotAvailable ? (
                                        <P3
                                            content={
                                                "Doctor not available for this date"
                                            }
                                        />
                                    ) : (
                                        <>
                                            <P3
                                                content={`${state.slotsData?.length} Slots Available`}
                                                className={"text-[10px]"}
                                            />
                                            <div className="flex gap-x-2.5 gap-y-[27px] flex-wrap min-h-[200px] maz-h-[200px] h-[200px] overflow-x-auto no-scrollbar">
                                                {state.doctorNotAvailable ? (
                                                    <P3
                                                        content={
                                                            "Doctor not available for this date"
                                                        }
                                                    />
                                                ) : (
                                                    state.slotsData?.map(
                                                        (slot, i) => (
                                                            <BoxButton
                                                                key={i}
                                                                content={`${slot?.startTime} - ${slot?.endTime}`}
                                                                onclick={(e) =>
                                                                    handleSelectingSlot(
                                                                        slot
                                                                    )
                                                                }
                                                                classname={`${appointmentBookingDetails?.AppointmentTime == slot && state.showTimeSlot == hospital?._id ? "bg-c3 text-c2" : "border border-c17 bg-c2 "} w-[125px] `}
                                                            />
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {!state.doctorNotAvailable &&
                                        appointmentBookingDetails?.AppointmentTime && (
                                            <LinkTextWithIcon
                                                to={`/doctor/${state.showTimeSlot}/book_appointment`}
                                                className=" whitespace-nowrap w-fit flex items-center text-c3"
                                            >
                                                Next <FaAngleRight size={16} />
                                            </LinkTextWithIcon>
                                        )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
            {/* Large screen hospital List to here  */}
            {!user && !isLoggedIn && <PatientLogIn />}
        </div>
    );
};

export default memo(DoctorDetails);
