import React, { useContext, useEffect } from 'react'
import ReceivedRequest from './ReceivedRequest'
import { UserList } from './UserList'
import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext';

export const Main = () => {
  const {authData}=useContext(AuthContext);
  const {getAllReceivedRequests,dispatch}=useContext(ProfileContext);

  useEffect(()=>{
  fetchHandlers()
  },[]);

  async function fetchHandlers(){
    try {
      const data=await getAllReceivedRequests(authData);
      dispatch({
        type:"GET_RECEIVED_REQUESTS",
        payload:data
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
        <ReceivedRequest fetchHandlers={fetchHandlers}/>
        <UserList/>
    </div>
  )
}
