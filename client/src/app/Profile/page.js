"use client"
import React, { useContext, useEffect } from 'react'
import { Main } from '../components/Profile/Main'
import { useRouter } from 'next/navigation';
import { AuthContext } from '../Context/AuthContext';
import { handler } from '@/Utils/constants';

const page = () => {
  const router=useRouter();
  const {authData} = useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])
  return (
    <div><Main/></div>
  )
}

export default page