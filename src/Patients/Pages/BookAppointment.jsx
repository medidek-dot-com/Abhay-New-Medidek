import { H7, P3, P5 } from "../../Common/Components/Text/Textt";
import DoctorCard from "../Components/Find Doctors/DoctorCard";
import PatientLogIn from "../Components/Authentication/PatientLogIn";
import {
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import SlotsCard from "../Components/Book Appointments/SlotsCard";
import moment from "moment";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import AppointmentContext from "../../Utils/Context/Patients/AppointmentContext";

const BookAppointment = () => {
    const { doctorId } = useParams();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [doctorInfo, setDoctorInfo] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const { appointmentBookingDetails, setAppointmentBookingDetails } =
        useContext(AppointmentContext);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [doctorNotAvailable, setDoctorNotAvailable] = useState(false);
    const [slotsData, setSlotsData] = useState([]);
    const [showTimeSlot, setShowTimeSlot] = useState(0);
    const [hospitalList, setHospitalList] = useState([]);

    const [selectedHospital, setSelectedHospital] = useState(
        appointmentBookingDetails?.hospitalId
    );

    const formInputs = [
        {
            title: "Name*",
            type: "text",
            placeholder: "Ex. John Doe",
            name: "name",
            classname: "",
            autofocus: false,
            value: user?.name,
        },
        {
            title: "Age*",
            type: "number",
            placeholder: "Ex. 25",
            name: "age",
            classname: "",
            autofocus: false,
            value: user?.age,
        },
        {
            title: "Gender*",
            type: "text",
            placeholder: "Name",
            name: "gender",
            classname: "",
            autofocus: false,
            value: user?.gender,
        },
        {
            title: "Mobile*",
            type: "number",
            placeholder: "Name",
            name: "phone",
            classname: "",
            autofocus: false,
            value: user?.phone,
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const getSingleDoctorDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorId}`
            );

            console.log("ye bhi render huwa");

            if (response.status === "ok") {
                setDoctorInfo(response.result);
                response.result;
                try {
                    const hospitaList = await axiosClient.get(
                        `/v2/multipleloginprofile/${response?.result?.doctorid}`
                    );
                    if (hospitaList.status === "ok") {
                        setHospitalList(hospitaList.result);
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

   
    const getAvailableSlots = async () => {
        try {
            if (showTimeSlot != 0) {
                setSlotsLoading(true);
                const response = await axiosClient.get(
                    `/v2/getAvailbleSlotsForAnUser/${showTimeSlot}/${moment(appointmentBookingDetails.appointmentDate, "DD MMM, ddd").format("YYYY-MM-DD")}`
                );
                if (response.status === "ok") {
                    if (
                        response.result[0] ==
                        "doctor not available for this date"
                    ) {
                        setDoctorNotAvailable(true);
                        return setSlotsLoading(false);
                    }
                    console.log(response.result);
                    console.log(response.result[0]);
                    setDoctorNotAvailable(false);
                    setSlotsData(response.result);
                    return setSlotsLoading(false);
                }
            }
        } catch (error) {
            setSlotsLoading(false);
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (showTimeSlot != 0) {
            getAvailableSlots();
        }
    }, [showTimeSlot, appointmentBookingDetails?.appointmentDate]);

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

        setDates(datesArray);
    };

    useEffect(() => {
        getSingleDoctorDetails();
    }, [doctorId]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
    }, []);

    console.log(appointmentBookingDetails?.AppointmentTime)

    return (
        <div className="overflow-x-hidden flex flex-col gap-5 relative min-h-[calc(100vh-108px)] my-[40px] px-4 md:px-[24.74%] ">
            {/* <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div> */}

            <H7 content="Enter Details" />
            <DoctorCard
                doctorInfo={doctorInfo}
                clickble={false}
                className={"border-none shadow-sm px-[17px] shadow-[#0000001A]"}
            />
            <H7 content="Select a hospital" />
            
            <div className="flex flex-col md:flex-row gap-[15px]">
                {hospitalList?.map((hospital) => (
                    <div
                        key={hospital?._id}
                        onClick={() =>
                            setAppointmentBookingDetails({
                                ...appointmentBookingDetails,
                                selectedHospital: hospital?._id,
                                hospitalId: hospital?.hospitalId,
                            })
                        }
                        className="flex items-center gap-[5px]"
                    >
                        {appointmentBookingDetails?.hospitalId ===
                        hospital?.hospitalId ? (
                            <IoIosRadioButtonOn
                                name="nameOFHospital"
                                size={20}
                                color="#108ED6"
                                className="cursor-pointer"
                            />
                        ) : (
                            <IoIosRadioButtonOff
                                name="nameOFHospital"
                                size={20}
                                color="#108ED6"
                                className="cursor-pointer"
                            />
                        )}
                        <P5
                            content={hospital?.hospitalId === null
                                ? hospital?.nameOfTheDoctor
                                : hospital?.hospitalId
                                      ?.nameOfhospitalOrClinic}
                            className="text-c14 cursor-pointer"
                        />
                    </div>
                ))}
            </div>
            <div>
                <SlotsCard
                    data={dates}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
            <P3
                content={"Patient Details"}
                className={"text-c20 text-[15px]"}
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
                {formInputs?.map((input, i) => (
                    <div key={i} className="flex flex-col gap-[10px]">
                        <P5 content={input.title} />
                        <Input1
                            type={input.type}
                            placeholder={input.placeholder}
                            name={input.name}
                            autofocus={input.autofocus}
                            value={input.value}
                            onchange={handleChange}
                            required={true}
                            classname={`${input?.value ? "bg-c26 border-none text-c4" : "bg-white"}`}
                        />
                    </div>
                ))}
                <PrimaryButton
                    content={"Book Appointment"}
                    type="submit"
                    loading={loading}
                    className={`bg-c1 font-f2 w-full md:w-[33.33%] mx-auto`}
                    h={"45px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    // disabled={!signInInfo.password}
                />
            </form>
            {!user && !isLoggedIn && <PatientLogIn />}
        </div>
    );
};

export default memo(BookAppointment);
