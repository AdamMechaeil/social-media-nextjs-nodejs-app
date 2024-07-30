import { AuthContext } from '@/app/Context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

export const Login = ({ setMode }) => {
  const { signin, dispatch } = useContext(AuthContext)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const router=useRouter();
  async function handleSubmit() {
    const data=await signin(formData);
    dispatch({
      type: "SIGNIN",
      payload: data
    })
    router.push('/Posts')
  }
  return (
    <div className="wrapper">
      <div className="logo">
        <img src="C:\Users\SHIAVM YADAV\Downloads\login.jpg" alt="" />
      </div>
      <div className="text-center mt-4 name">
        Login
      </div>
      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input type="Email" name="Email" id="email" placeholder="Email" onChange={(e) => {
            setFormData((prev) => { return { ...prev, email: e.target.value } })
          }} />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input type="password" name="password" id="pwd" placeholder="Password" onChange={(e) => {
            setFormData((prev) => { return { ...prev, password: e.target.value } })
          }} />
        </div>
      </form>
      <button className="btn mt-3" id="submitBtn" onClick={() => {
        handleSubmit();
      }}>Login</button>
      <div className="text-center fs-6 my-3">
        <button className='bg-transparent' style={{ border: "0px" }}><span style={{ color: "black" }}
        onClick={()=>{
          router.push("/Auth/ForgotPassword")
        }}
        >Forgot Password</span></button>
        <span style={{ color: "black" }}>&nbsp; or &nbsp;</span>
        <button className='bg-transparent' style={{ border: "0px" }} onClick={() => {
          setMode("signup")
        }}>
          <span style={{ color: "black" }}>
            Sign Up</span>
        </button>
      </div>
    </div>
  )
}
