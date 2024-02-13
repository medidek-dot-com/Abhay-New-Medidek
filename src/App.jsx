import React, { memo } from 'react'
import Navbar from './Common/Navbar/Navbar'
import { useSelector } from 'react-redux'
import Patient from './Patients/Patient';


const App = () => {
  const {user, isLoggedIn} = useSelector((state) => state.auth);
  // {(isLoggedIn && user?.role == "DOCTOR" && <></>) ||

  return (
    <div className=''>
      <Navbar/>
{
  isLoggedIn && user?.role == "DOCTOR" && <Patient/> 
}
{
  isLoggedIn && user?.role == "MASTER" && <Patient/> 
}
{
  isLoggedIn && user?.role == "PATIENT" && <Patient/> 
}
{
  !isLoggedIn && !user && <Patient/> 
}
    </div>
  )
}

export default memo(App)