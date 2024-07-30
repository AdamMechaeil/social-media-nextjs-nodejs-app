import { AuthContext } from '@/app/Context/AuthContext';
import React, { useContext, useState } from 'react'
import { TypeNewPassword } from './TypeNewPassword';
let email = ""
let otp = ""
export const ForgotPassword = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { findUserByEmail, generateOtp, verifyOtp } = useContext(AuthContext);
  const [auxUser, setAuxUser] = useState()
  const [newPassWord, setNewPassword] = useState(false)
  async function generateOtpHandler() {
    try {
      const user = await findUserByEmail({ email: email })
      const status = await generateOtp(user?.user?._id);
      setAuxUser(user?.user);
      if (status == 200) {
        setShowOtpInput(true);
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function verifyOtpHandler() {
    const data = await verifyOtp({ _id: auxUser._id, otp: otp });

    if (data?.verified) {
      setShowOtpInput(false);
      setNewPassword(true);
    }

    console.log(data);
  }
  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
        <div className="card p-5 shadow">
          <input type="email" placeholder='Please Enter Email'
            onChange={(e) => {
              email = e.target.value
            }}
          />
          <br />
          {!showOtpInput&&!newPassWord && <button className='btn btn-outline-success'
            onClick={() => {
              generateOtpHandler()
            }}
          >Generate OTP!</button>}
          <br />
          {
            showOtpInput && (
              <div>
                <input type="text" placeholder='Enter OTP!' onChange={(e) => {
                  otp = e.target.value;
                }} />
                <button onClick={() => {
                  verifyOtpHandler()
                }}>Verify OTP!</button>
              </div>
            )
          }
          <div>
            {
              newPassWord ? <TypeNewPassword id={auxUser?._id} /> : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
