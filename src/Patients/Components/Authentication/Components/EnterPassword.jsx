import React, { memo } from "react";
import { FormLable, FormSpan, H4 } from "../../../../Common/Components/Text/Textt";
import { Input1 } from "../../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../../Common/Components/Buttons/PrimaryButton";
const EnterPassword = () => {
    return (
        <div>
            <H4 content="To Sign in, " className="mb-1" />
            <H4 content="Enter your Number or Email" className="mb-[25px]" />
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Input1 name="password" placeholder="Enter Password" classname="w-full" />
                    <div className="flex justify-between">
                        <div className="flex gap-[5px]">
                            <input
                                type="radio"
                                name="rememberMe"
                                id="rememberMe"
                            />
                            <FormLable
                                htmlFor="rememberMe"
                                content="Remember me?"
                            />
                        </div>
                        <FormSpan content="Forgot Password?" />
                    </div>
                </div>
                <PrimaryButton
                    className={"bg-c1 font-f2 font-w1 w-full"}
                    w={"145px"}
                    h={"45px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Continue"}
                />
            </form>
        </div>
    );
};

export default memo(EnterPassword);
