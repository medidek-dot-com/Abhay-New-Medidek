import React, {memo, useState} from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({children}) =>{
    const [signInInfo, setSignInInfo] = useState({
        emailOrPhone:"",
        password: "",
    })

    const [requiredLogIn, setRequiredLogIn] = useState(false);

    return(
        <AuthContext.Provider value={{signInInfo, setSignInInfo, requiredLogIn, setRequiredLogIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default memo(AuthContextProvider);