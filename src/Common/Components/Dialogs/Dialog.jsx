import React, { memo, useEffect } from "react";
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
        <div className="fixed flex justify-center items-center inset-0 z-40 bg-c21 px-4">
            <div className="relative bg-c2 w-full md:w-[441px] rounded-[6px] md:mx-auto p-[25px] ">
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

export default memo(Dialog);
