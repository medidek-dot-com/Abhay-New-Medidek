import React, { memo } from "react";

const BoxButton = ({ content, classname, onclick, style, }) => {
    return (
        <button
            onClick={onclick}
            style={style}
            className={` text-c16 h-[37px] rounded-[3px] p-[14] font-f3 font-w1 text-[13px] ${classname}`}
        >
            {content}
          
        </button>
    );
};

export default memo(BoxButton);
