import { memo, useCallback } from "react";

export const Input1 = memo(
    ({
        type = "",
        placeholder = "",
        name = "",
        classname = "",
        autofocus,
        value,
        onchange,
    }) => {
        return (
            <input
                autoFocus={autofocus}
                value={value}
                onChange={onchange}
                type={type}
                placeholder={placeholder}
                name={name}
                className={`outline-none border border-c18 h-[40px] px-4 rounded-[5px] ${classname} placeholder:text-c22 placeholder:font-f3 font-[500]`}
            />
        );
    }
);
export const Input2 = memo(
    ({
        type = "",
        placeholder = "",
        name = "",
        divClasses = "",
        icon,
        inputClasses = "",
        iconClasses = "",
        value,
        children,
        onchange,
        autoFocus,
    }) => {
        return (
            <div
                className={`relative h-[41px] border border-c17 rounded-[106px]  ${divClasses} `}
            >
                <input
                    type={type}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    name={name}
                    onChange={onchange}
                    value={value}
                    className={`outline-none border font-f2 font-w1 leading-[18.04px] rounded-[106px] text-c19 border-c18 w-full h-full ${icon && "pr-[24%]   md:pr-[14%]"} px-[15px] placeholder:text-c22 placeholder:font-f3 font-[500] border-none ${inputClasses}`}
                />
                {icon && (
                    <img
                        src={icon}
                        alt="icon"
                        className={`absolute right-0 top-0 bottom-0 my-auto  ${icon && "mr-[15px]"} ${iconClasses}`}
                    />
                )}
                {children}
            </div>
        );
    }
);

export const TextArea = memo(
    ({ type = "", placeholder = "", name = "", classname = "" }) => {
        return (
            <textarea
                type={type}
                placeholder={placeholder}
                name={name}
                rows={4}
                cols={6}
                className={`outline-none border border-c18 p-[14px] rounded-[5px] ${classname}`}
            />
        );
    }
);
