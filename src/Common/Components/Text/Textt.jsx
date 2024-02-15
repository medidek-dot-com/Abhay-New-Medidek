import React from 'react'
import { Link } from 'react-router-dom';


export const H1 = ({content = '', className=''}) => {
    return (
        <h1 className={`font-f1 font-w3 leading-[59.99px] text-[45px] text-c15 ${className}`}>{content}</h1>
    )
};

export const H2 = ({content = '', className=''}) => {
    return (
        <h2 className={`font-f1 font-w2 leading-[55.52px] text-[1.5rem] md:text-[40px] text-c15 ${className}`}>{content}</h2>
    )
};
export const H5 = ({content = '', className=''}) => {
    return (
        <h5 className={`font-f1 font-w2 leading-[55.52px] text-[2.5rem] md:text-[40px] text-c16 ${className}`}>{content}</h5>
    )
};
export const H6 = ({content = '', className=''}) => {
    return (
        <h6 className={`font-f1 font-w2 leading-[33.32px] md:text-[1.563rem]  text-c16 ${className}`}>{content}</h6>
    )
};
export const H7 = ({content = '', className=''}) => {
    return (
        <h6 className={`font-f2 font-w2 leading-[22.5px] md:text-[0.938rem]  text-c20 ${className}`}>{content}</h6>
    )
};
export const H8 = ({content = '', className=''}) => {
    return (
        <h6 className={`font-f2 font-w1 leading-[22.5px] md:text-[0.938rem]  text-c20 ${className}`}>{content}</h6>
    )
};
export const H4 = ({content = '', className=''}) => {
    return (
        <h2 className={`font-f2 font-w2 leading-[19.56px] md:leading-[24.44px] text-[1rem] md:text-[1.25rem] text-c15 ${className}`}>{content}</h2>
    )
};
export const P1 = ({content = '', className=''}) => {
    return (
        <p className={`font-f2 font-w1 leading-[24px] text-[1rem] text-c12 ${className}`}>{content}</p>
    )
};
export const P2 = ({content = '', className=''}) => {
    return (
        <p className={`font-f3 font-semibold leading-[18.07px] text-[13px] text-c12 ${className}`}>{content}</p>
    )
};

export const P3 = ({content = '', className=''}) => {
    return (
        <p className={`font-f2 font-w2 leading-[22.5px] text-[15px] text-c16 ${className}`}>{content}</p>
    )
};

export const Span = ({content = '', className=''}) => {
    return (
        <p className={`font-f3 font-w1 leading-[15.6px] text-[13px] text-c4 ${className}`}>{content}</p>
    )
};
export const Span2 = ({children, className=''}) => {
    return (
        <p className={`font-f2 font-w1 leading-[19.5px] text-[13px] text-c11 ${className}`}>{children}</p>
    )
};
export const P4 = ({content = '', className=''}) => {
    return (
        <p className={`font-f3 font-w2 leading-[22.5px] text-[15px] text-c16 ${className}`}>{content}</p>
    )
};

export const FormLable = ({content = '', className='', htmlFor=''}) => {
    return (
        <label htmlFor={htmlFor} className={`font-f3 font-w2 leading-[15.6px] text-[0.813rem] text-c3 ${className}`}>{content}</label>
    )
};
export const FormSpan = ({content = '', className='', onclick}) => {
    return (
        <span onClick={onclick} className={`font-f3 font-w2 leading-[15.6px] text-[0.813rem] text-c3 cursor-pointer ${className}`}>{content}</span>
    )
};


const Text = () => {
    return (
      <div>text</div>
    )
  }
  
  export default Text;



