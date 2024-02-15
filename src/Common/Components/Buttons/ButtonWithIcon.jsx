import React from 'react'

const ButtonWithIcon = ({children, onclick}) => {
  return (
    <button onClick={onclick} className='border border-c18 text-base flex gap-[5px] items-center px-[54px] py-2.5 rounded-[5px] font-f3 font-w1 text-c4'>{children}</button>
  )
}

export default ButtonWithIcon