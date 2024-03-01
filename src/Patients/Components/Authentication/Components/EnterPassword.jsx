import React, { memo, useCallback, useContext, useState } from "react";
import {
    ErrorSpan,
    FormLable,
    FormSpan,
    H4,
} from "../../../../Common/Components/Text/Textt";
import { Input1, Input2 } from "../../../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../../../Common/Components/Buttons/PrimaryButton";
import AuthContext from "../../../../Utils/Context/Patients/AuthContext";
import { axiosClient } from "../../../../Utils/axiosClient";
import { useDispatch } from "react-redux";
import { login } from "../../../../Utils/Store/authSlice";
import {
    KEY_ACCESS_TOKEN,
    setItem,
} from "../../../../Utils/localStorageManager";
const EnterPassword = () => {
    const { signInInfo, setSignInInfo } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            setSignInInfo({ ...signInInfo, [name]: value });
            setIncorrectPassword(false);
        },
        [signInInfo.password]
    );

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            try {
                setLoading(true);
                const response = await axiosClient.post(
                    "/v2/FindUserByNameAndPassword",
                    {
                        email: signInInfo.emailOrPhone,
                        password: signInInfo.password,
                        role: "PATIENT",
                    }
                );

                if (response.status === "ok") {
                    dispatch(login(response.result.ispatient));
                    setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                    setLoading(false);

                    // setEnterPassword(true);
                    return;
                }
            } catch (error) {
                if (error.statusCode === 403) {
                    setLoading(false);
                    setIncorrectPassword(true);
                    return;
                }
                console.log(error);
                setLoading(false);
            }
        },
        [signInInfo.password]
    );

    return (
        <div>
            <H4 content="To Sign in, " className="mb-1" />
            <H4 content="Enter your Number or Email" className="mb-[25px]" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Input2
                        name="password"
                        autoFocus={true}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        classname="w-full"
                        divClasses={"rounded-[5px]"}
                        inputClasses={"rounded-[5px]"}
                        required={true}
                        icon={
                            showPassword
                                ? "/Forms/Eye open.svg"
                                : "/Forms/Eye close.svg"
                        }
                        value={signInInfo.password}
                        onchange={handleChange}
                        iconClasses={"w-[21px] h-[21px] cursor-pointer"}
                        iconClick={() => setShowPassword(!showPassword)}
                    />
                    {incorrectPassword && (
                        <ErrorSpan
                            content={"Wrong Password"}
                            className={"-my-[5px] ml-2"}
                        />
                    )}
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
                    type="submit"
                    loading={loading}
                    className={`${!signInInfo.password ? "bg-c23" : "bg-c1"} font-f2 w-full`}
                    w={"145px"}
                    h={"45px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    content={"Sign In"}
                    disabled={!signInInfo.password}
                />
            </form>
        </div>
    );
};

export default memo(EnterPassword);
