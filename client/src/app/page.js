"use client"
import { AuthContext } from "./Context/AuthContext";
import { useContext, useEffect } from "react";
import { handler } from "@/Utils/constants";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  const {authData} = useContext(AuthContext);
  useEffect(()=>{
    handler(authData,router)
  },[])

  return (
   <div>
    <p>Hello</p>
   </div>
  );
}
