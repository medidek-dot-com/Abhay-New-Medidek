import React from "react";
import { Input1 } from "../../../Components/Inputs/Inputs";
import { FormLable, FormSpan, H4, Span2 } from "../../../Components/Text/Textt";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import ButtonWithIcon from "../../../Components/Buttons/ButtonWithIcon";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";

const EnterMailOrPhone = () => {
    return (
        <div>
            <H4 content="To Sign in, " className="mb-1" />
            <H4 content="Enter your Number or Email" className="mb-[25px]" />
            <form className="flex flex-col gap-5">
                <Input1
                    placeholder="Enter Email address or Phone Number"
                    classname="w-full"
                    name="phoneOrEmail"
                />

                <PrimaryButton
                    className={"bg-c1 font-f2 font-w1 w-full"}
                    w={"145px"}
                    h={"40px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Continue"}
                />
            </form>
            <div className="flex items-center my-[20px]">
                <span className="w-full h-[1.5px] bg-c18"></span>
                <span className="mx-9">Or</span>
                <span className="w-full h-[1.5px] bg-c18"></span>
            </div>
            <div className="flex gap-[11px]">
                <ButtonWithIcon>
                    <FcGoogle size={24} /> Google
                </ButtonWithIcon>
                <ButtonWithIcon>
                    <BiLogoFacebookCircle size={24} color="#1877F2" /> Facebook
                </ButtonWithIcon>
            </div>
            <Span2 className="mt-4 text-center flex gap-[5px] justify-center">
                Don’t have an account?
                <FormSpan content="Click here" />
            </Span2>
        </div>
    );
};

export default EnterMailOrPhone;
