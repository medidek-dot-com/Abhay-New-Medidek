import React from "react";

const PrimaryButton = ({
    w = "",
    h = "",
    bg = "c1",
    color = "",
    radius = "",
    className = "",
    content = "",
    px="",
    py="",
    onclick,
    reff,
    type
}) => {
    return (
        <button
        ref={reff}
        type={type}
            onClick={onclick}
            className={`w-[${w}] h-[${h}]  text-${color} rounded-[${radius}] font-f2 font-w1 ${className}`}
        >
            {content}
        </button>
    );
};

// rough work (decency)

{
    /* <button className='w-[145px] h-[45px] bg-[#1F51C6] text-white rounded-[44px]'>
          Sign in
        </button> */
}

export default PrimaryButton;
