import React from "react";
import { Input1 } from "../../../Components/Inputs/Inputs";
import { FormLable, FormSpan, H4, Span2 } from "../../../Components/Text/Textt";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import ButtonWithIcon from "../../../Components/Buttons/ButtonWithIcon";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";

const EnterMailOrPhone = () => {
    const handleContineo = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <H4 content="To Sign in, " className="mb-1" />
            <H4 content="Enter your Number or Email" className="mb-[25px]" />
            <form onSubmit={handleContineo} className="flex flex-col gap-5">
                <Input1
                    placeholder="Enter Email address or Phone Number"
                    classname="w-full"
                    name="phoneOrEmail"
                    type="email"
                    autofocus={true}
                />

                <PrimaryButton
                    className={"bg-c1 font-f2 font-w1 w-full"}
                    h={"40px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Continue"}
                    type={"submit"}
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
                <FormSpan content="Click here" />
            </Span2>
        </div>
    );
};

export default EnterMailOrPhone;
