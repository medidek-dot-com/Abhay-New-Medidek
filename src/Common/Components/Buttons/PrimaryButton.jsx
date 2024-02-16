import React, { memo } from "react";
import LoadingDots from "../Animation/LoadingDots/LoadingDots";

const PrimaryButton = memo(({
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
    type,
    children,
    loading
}) => {
    return (
        <button
        ref={reff}
        type={type}
            onClick={onclick}
            className={`w-[${w}] h-[${h}]  text-${color} rounded-[${radius}] font-f2 font-w1 ${className}`}
        >
            {loading ? <LoadingDots/> : content}
        </button>
    )
});

// rough work (decency)

{
    /* <button className='w-[145px] h-[45px] bg-[#1F51C6] text-white rounded-[44px]'>
          Sign in
        </button> */
}

export default memo(PrimaryButton);
