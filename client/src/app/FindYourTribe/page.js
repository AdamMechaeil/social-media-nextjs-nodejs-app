"use client"
import React, { useContext, useEffect } from 'react'
import Header from '../components/Header/Main'
import { Main } from '../components/FindYourTribe/Main'
import { AuthContext } from '../Context/AuthContext'
import { handler } from '@/Utils/constants'
import { useRouter } from 'next/navigation'

const page = () => {
  const router=useRouter();
  const {authData} = useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])
  return (
    <>
    <Header/>
    <Main/>
    </>
  )
}

export default page