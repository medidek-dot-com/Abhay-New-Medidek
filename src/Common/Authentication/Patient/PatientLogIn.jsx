import React, { useState } from "react";
import { FormLable, FormSpan, H4 } from "../../Components/Text/Textt";
import { Input1 } from "../../Components/Inputs/Inputs";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Dialog from "../../Components/Dialogs/Dialog";

const PatientLogIn = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog  onclose={()=>setOpen(false)}>
            <div>
                <H4 content="To Sign in," className="mb-1" />
                <H4 content="Enter your Password" className="mb-[25px]" />
                <form className="flex flex-col gap-4">
                    <Input1 placeholder="Enter Password" classname="w-full" />
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
                    <PrimaryButton
                        className={"bg-c1 font-f2 font-w1 w-full"}
                        w={"145px"}
                        h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Sign In"}
                    />
                </form>
            </div>
        </Dialog>
    );
};

export default PatientLogIn;
