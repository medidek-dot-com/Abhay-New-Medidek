import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import crossIcon from "/Find Doctors/cross.png";

const Dialog = ({ children, onclose }) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-40 bg-c21 ">
            <div className="bg-c2 z-50 w-[441px] rounded-[6px] mx-auto p-[25px] fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
                <img
                    src={crossIcon}
                    onClick={onclose}
                    alt="cross icon"
                    className="absolute top-0 right-0 mt-[25px] mr-[25px] w-4 h-4"
                />
                {children}
            </div>
        </div>,
        document.querySelector(".myportalModelDiv")
    );
};

export default Dialog;
