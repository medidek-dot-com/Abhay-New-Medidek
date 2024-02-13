import React from 'react'

const Avatar = ({src, className}) => {
  return (
    <>
    <img src={src} alt="Avatar" className={`rounded-full ${className}`} />
    </>
  )
}

export default Avatar