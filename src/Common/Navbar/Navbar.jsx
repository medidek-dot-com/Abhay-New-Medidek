import React, { memo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import useClickAwayToClose from "../../Utils/Hooks/useClickAwayToClose";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Components/Avatar/Avatar";
import { LinkText, P1, TextButton } from "../Components/Text/Textt";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import { logout } from "../../Utils/Store/authSlice";
import MobileNav from "./MobileNav";
// import { options } from 'prettier-plugin-tailwindcss';

const Navbar = () => {
    const [showCard, setShowCard] = useState(false);
    const [menu, setMenu] = useState(false);
    const { user, isLoggedIn } = useSelector((state) => state.auth);
const dispatch = useDispatch();

    const clickAwayToClose = () => setShowCard(false);

    const ref = useClickAwayToClose(clickAwayToClose);

    const cardContent = [
        {
            signInAs: "Paitent",
            options: [
                { text: "Sign In", to: "/patient/signin" },
                { text: "Sign Up", to: "/patient/signup" },
            ],
        },
        {
            signInAs: "Hospital",
            options: [
                { text: "Sign In", to: "/hospital/signin" },
                { text: "Sign Up", to: "/hospital/signup" },
            ],
        },
        {
            signInAs: "Doctor",
            options: [
                { text: "Sign In", to: "/doctor/signin" },
                { text: "Sign Up", to: "/doctor/signup" },
            ],
        },
    ];

    const navigate = useNavigate();

    const location = useLocation().pathname;

    const logoutUser = ()=>{
        removeItem(KEY_ACCESS_TOKEN);
        dispatch(logout());
        window.location.replace('/');
    }

    const ulList = [
        { content: "Home", pathname: "/" },
        { content: "Find Doctors", pathname: "/find-doctors" },
        { content: "Appointments", pathname: "/appointments" },
        { content: "Records", pathname: "/records" },
        { content: "Contact Us", pathname: "/contact-us" },
        { content: "Our Team", pathname: "/our-team" },
        { content: "Blogs", pathname: "/blogs" },
    ];
    return (
        // <header className="relative mx-[50px] my-[30px]">
        <header className="flex sticky top-0 z-10 justify-between px-4 py-4 md:px-[50px] md:pt-[30px] items-center backdrop-blur-[30px] ">
            <img
                onClick={() => navigate("/")}
                src="/Home/IMG_20240127_122502.png"
                alt="logo"
                className="w-[88px] h-[27px] md:w-[136px] md:h-[43px]"
            />
            <nav className="hidden md:flex items-center gap-[34px] bg-[#1F51C61F] px-[22px] py-[4px] rounded-[93px] ">
                {ulList.map((list, i) => (
                    <Link
                        key={i}
                        to={list.pathname}
                        className={`${location === list.pathname ? "text-c1 font-w3" : "text-c13 font-w2 "} p-2 `}
                    >
                        {list.content}
                    </Link>
                ))}
            </nav>
            {!user && !isLoggedIn ? (
                <div ref={ref} className="relative w-fit hidden md:block">
                    <PrimaryButton
                        onclick={() => setShowCard(!showCard)}
                        className={"bg-c1"}
                        w={"145px"}
                        h={"45px"}
                        bg={"c1"}
                        color={"white"}
                        radius={"44px"}
                        content={"Sign In"}
                    />
                    {showCard && (
                        <div className=" flex flex-col bg-white border border-[#D9D9D980] absolute right-0 mt-3  rounded-[5px] ">
                            {cardContent.map((items, i) => (
                                <React.Fragment key={i}>
                                    <div className="w-[241px] flex justify-between items-center my-4 mx-4">
                                        <p className="font-f2 font-w1 leading-[15.89px] text-[0.813rem]	">
                                            {items.signInAs}{" "}
                                        </p>
                                        <div className="">
                                            {items.options.map(
                                                (option, index) => (
                                                    <Link
                                                        to={option.to}
                                                        onClick={() =>
                                                            setShowCard(false)
                                                        }
                                                        key={index}
                                                        className={`mr-[10px] ${index === 0 && "border-b-2 border-dashed border-[#108ED6]"} text-c14 font-f2 font-w1 text-[0.813rem] leading-[15.89px]`}
                                                    >
                                                        {option.text}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative w-fit hidden md:block">
                    <Avatar
                        src={user?.imgurl ? user?.imgurl : "/Navbar/human.png"}
                        className={"w-[52px] h-[52px]"}
                    />
                    <div className=" flex flex-col bg-white border border-[#D9D9D980] absolute right-0 mt-3  rounded-[5px] ">
                        <LinkText to={'/edit-profile'} content={'Edit'}/>
                        <TextButton content={'Logout'} onclick={logoutUser} />
                    </div>
                </div>
            )}

            <div className="relative block md:hidden">
                {menu ? (
                    <img
                        src="/Home/cross.svg"
                        alt="icon"
                        className=""
                        onClick={() => setMenu(!menu)}
                    />
                ) : (
                    <img
                        src="/Home/Nav.svg"
                        alt="icon"
                        className=""
                        onClick={() => setMenu(!menu)}
                    />
                )}
            </div>
            {menu && <MobileNav data={ulList} logoutUser={logoutUser} setMenu={setMenu}/>}
        </header>
        // </header>
    );
};

export default memo(Navbar);
