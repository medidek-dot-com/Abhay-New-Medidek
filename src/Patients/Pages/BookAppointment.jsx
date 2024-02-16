import { H7 } from "../../Common/Components/Text/Textt";
import DoctorCard from "../Components/Find Doctors/DoctorCard";
import PatientLogIn from '../Components/Authentication/PatientLogIn'


const BookAppointment = () => { 

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
