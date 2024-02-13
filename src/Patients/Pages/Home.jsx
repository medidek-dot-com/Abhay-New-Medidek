import React from 'react'
import Section1 from '../Components/Home/Section1'
import Section2 from '../Components/Home/Section2'
import Section3 from '../Components/Home/Section3'
import Section4 from '../Components/Home/Section4'
import Section5 from '../Components/Home/Section5'
import Section6 from '../Components/Home/Section6'

const Home = () => {
  return (
    <div className='flex flex-col gap-[110px] md:gap-0 bg-gradient-to-r '>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  )
}

export default Home