import React, { memo, useCallback, useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import {
    ErrorSpan,
    FormSpan,
    H4,
    Span2,
} from "../../../../Common/Components/Text/Textt";
import { Input2 } from "../../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../../Common/Components/Buttons/PrimaryButton";
import ButtonWithIcon from "../../../../Common/Components/Buttons/ButtonWithIcon";
import AuthContext from "../../../../Utils/Context/Patients/AuthContext";
import { axiosClient } from "../../../../Utils/axiosClient";

const EnterMailOrPhone = ({ setEnterPassword }) => {
    const [signUp, setSignUp] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const { signInInfo, setSignInInfo } = useContext(AuthContext);

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            setSignInInfo({ ...signInInfo, [name]: value.trim() });
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValidEmail(emailRegex.test(e.target.value));
            setNotFound(false);
        },
        [signInInfo.emailOrPhone]
    );

    const handleContinue = useCallback(
        async (e) => {
            e.preventDefault();
            if (!signInInfo.emailOrPhone) {
                console.log("email or phone required");
                console.log(signInInfo);
            }
            try {
                setLoading(true);
                const response = await axiosClient.post(
                    "/v2/findPatientByEmailOrPhone",
                    { emailOrPhone: signInInfo.emailOrPhone }
                );

                if (response.status === "ok") {
                    if (response.result === "Patient") {
                        setLoading(false);
                        setEnterPassword(true);
                        return;
                    }
                }
            } catch (error) {
                if (error.statusCode === 404) {
                    setLoading(false);
                    setNotFound(true);
                    return;
                }
                console.log(error);
                setLoading(false);
            }
        },
        [signInInfo.emailOrPhone]
    );

    return (
        <div>
            <H4 content="To Sign in, " className="mb-1" />
            <H4 content="Enter your Number or Email" className="mb-[25px]" />
            <form onSubmit={handleContinue} className="flex flex-col gap-5">
                <Input2
                    placeholder="Enter Email address or Phone Number"
                    classname="w-full"
                    name="emailOrPhone"
                    type="email"
                    required={true}
                    value={signInInfo?.emailOrPhone}
                    onchange={handleChange}
                    autofocus={true}
                    icon={notFound ? "/Forms/errorIcon.png" : null}
                    divClasses={'rounded-[5px]'}
                    inputClasses={'rounded-[5px]'}
                    iconClasses={"w-[21px] h-[21px]"}
                />
                {notFound && (
                    <ErrorSpan
                        content={"User Not Found"}
                        className={"-my-[10px] ml-2"}
                    />
                )}
                <PrimaryButton
                    className={`${isValidEmail ? "bg-c1" : "bg-c23"} font-f2 font-w1 w-full`}
                    h={"40px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Continue"}
                    type={"submit"}
                    loading={loading}
                    disabled={!isValidEmail}
                />
            </form>
            <div className="flex items-center gap-[36px] my-[20px]">
                <span className="w-full h-[1.5px] bg-c18"></span>
                <span className="">Or</span>
                <span className="w-full h-[1.5px] bg-c18"></span>
            </div>
            <div className="flex gap-2.5 md:gap-[11px]">
                <ButtonWithIcon>
                    <FcGoogle size={24} /> Google
                </ButtonWithIcon>
                <ButtonWithIcon>
                    <BiLogoFacebookCircle size={24} color="#1877F2" /> Facebook
                </ButtonWithIcon>
            </div>
            <Span2 className="mt-4 text-center flex gap-[5px] justify-center items-center">
                Don’t have an account?
                <FormSpan
                    content="Click here"
                    onclick={() => setSignUp(true)}
                />
            </Span2>
        </div>
    );
};

export default memo(EnterMailOrPhone);
