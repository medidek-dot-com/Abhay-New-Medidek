import { useState } from "react";
import Dialog from '../../../Common/Components/Dialogs/Dialog';
import EnterPassword from '../Authentication/Components/EnterPassword';
import EnterMailOrPhone from '../Authentication/Components/EnterMailOrPhone'

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
