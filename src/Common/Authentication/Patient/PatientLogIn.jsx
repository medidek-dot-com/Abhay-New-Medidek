import React, { useState } from "react";
import { FormLable, FormSpan, H4 } from "../../Components/Text/Textt";
import { Input1 } from "../../Components/Inputs/Inputs";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Dialog from "../../Components/Dialogs/Dialog";
import EnterMailOrPhone from "./Components/EnterMailOrPhone";
import EnterPassword from "./Components/EnterPassword";

const PatientLogIn = () => {
    const [open, setOpen] = useState(false);
    const [enterPassword, setEnterPassword] = useState(false);
    return (
        <Dialog onclose={() => setOpen(false)}>
            {enterPassword ? <EnterPassword /> : <EnterMailOrPhone />}
        </Dialog>
    );
};

export default PatientLogIn;
