"use client"
import React, { useContext, useEffect } from 'react'
import { CreatePost } from '../components/Posts/CreatePost'
import Header from '../components/Header/Main'
import { handler } from '@/Utils/constants'
import { AuthContext } from '../Context/AuthContext'
import { useRouter } from "next/navigation";

const page = () => {
  const router=useRouter();
  const {authData} = useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])
  return (
    <div>
      <Header/>
      <CreatePost/>
      </div>
  )
}

export default page