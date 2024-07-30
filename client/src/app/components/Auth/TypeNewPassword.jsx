import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export const TypeNewPassword = ({id}) => {
  console.log(id);
  const [passwordStruc,setPasswordStruc]= useState({newPassWord:"",confirmNewPassword:""})
  const {forgotPassword} = useContext(AuthContext);
  const router=useRouter()
  async function ForgotPassword(){
    try {
      if(passwordStruc.newPassWord!="" && passwordStruc.confirmNewPassword!=""){
        if(passwordStruc.newPassWord==passwordStruc.confirmNewPassword){
          const status=await forgotPassword(id,{password:passwordStruc.newPassWord})
          if(status==200){
            router.push("/Auth");
          }
        }else{
          alert("Passwords donot Match")
        }
      }else{
        alert("Fields cannot be empty")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
        <input type="text" placeholder='Type New Password' onChange={(e)=>{
          setPasswordStruc(prev=>{
            return {...prev,newPassWord:e.target.value}
          })
        }}/>
        <br />
        <br />
        <input type="text" placeholder='Confirm New Password' onChange={(e)=>{
          setPasswordStruc(prev=>{
            return {...prev,confirmNewPassword:e.target.value}
          })
        }} />
        <br />
        <br />
        <button className='btn btn-outline-info' onClick={()=>{
          ForgotPassword();
        }}>Submit</button>
    </div>
  )
}
