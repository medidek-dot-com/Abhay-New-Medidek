import React, {memo, useState} from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({children}) =>{
    const [signInInfo, setSignInInfo] = useState({
        emailOrPhone:"",
        password: "",
    })

    return(
        <AuthContext.Provider value={{signInInfo, setSignInInfo}}>
            {children}
        </AuthContext.Provider>
    )
}

export default memo(AuthContextProvider);