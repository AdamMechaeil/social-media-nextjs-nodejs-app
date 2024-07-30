import { AuthContext } from '@/app/Context/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useRef } from 'react'

export const Signup = ({ setMode }) => {
  const { signup ,dispatch} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    confirmPassword: ""
  });

  const ref=useRef(null);
  const router=useRouter();
  async function handleSubmit(){
    try {
      delete formData.confirmPassword;
      let data=await signup(formData)
      dispatch({
        type:"SIGNUP",
        payload:data
      })
      ref.current.reset();
      router.push("/Posts")
    } catch (error) {
      console.log(error);
    }
  }

  console.log(formData);
  return (
    <section class="vh-100 gradient-custom ">
      <div class="container py-5 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7 ">
            <div class="card shadow-2-strong card-registration shadow-lg " style={{ borderRadius: "15px;" }}>
              <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 ">Sign Up Form</h3>
                <form ref={ref}>
                  <div class="row">
                    <div class="col-md-6 mb-4">

                      <div class="form-outline">
                        <label class="form-label" for="firstName">First Name</label>
                        <input type="text" id="firstName" class="form-control form-control-lg" onChange={(e) => {
                          setFormData((prev) => { return { ...prev, firstname: e.target.value } })
                        }} />
                      </div>

                    </div>
                    <div class="col-md-6 mb-4">

                      <div class="form-outline">
                        <label class="form-label" for="lastName">Last Name</label>
                        <input type="text" id="lastName" class="form-control form-control-lg  " onChange={(e) => {
                          setFormData((prev) => { return { ...prev, lastname: e.target.value } })
                        }} />
                      </div>

                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 d-flex align-items-center">

                      <div class="form-outline datepicker w-100">
                        <label for="birthdayDate" class="form-label">Birthday</label>
                        <input type='date' class="form-control form-control-lg  " id="birthdayDate" onChange={(e) => {
                          let age = ""
                          const date = new Date(e.target.value)
                          const today = new Date();
                          if (today.getDate() > date.getDate()) {
                            if (today.getMonth() >= date.getMonth()) {
                              age = today.getFullYear() - date.getFullYear();
                            } else {
                              age = today.getFullYear() - date.getFullYear() - 1;
                            }
                          } else if (today.getDate() < date.getDate()) {
                            if (today.getMonth() >= date.getMonth()) {
                              age = today.getFullYear() - date.getFullYear();
                            } else {
                              age = today.getFullYear() - date.getFullYear() - 1;
                            }
                          } else {
                            if (today.getMonth() >= date.getMonth()) {
                              age = today.getFullYear() - date.getFullYear();
                            } else {
                              age = today.getFullYear() - date.getFullYear() - 1;
                            }
                          }
                          setFormData((prev) => { return { ...prev, age: age } })
                        }} />
                      </div>

                    </div>
                    <div class="col-md-6 mb-4">

                      <h6 class="mb-2 pb-1">Gender: </h6>


                      <div class="q" onChange={(e) => {
                        setFormData((prev) => { return { ...prev, gender: e.target.value } })
                      }}>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="gender" id="male" value="male" />
                          <label class="form-check-label" for="gender">Male</label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="gender" id="female" value="female" />
                          <label class="form-check-label" for="gender">Female</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="gender" id="other" value="other" />
                          <label class="form-check-label" for="gender">Other</label>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">

                      <div class="form-outline">
                        <label class="form-label" for="emailAddress">Email</label>
                        <input type="email" id="emailAddress" class="form-control form-control-lg" onChange={(e) => {
                          setFormData((prev) => { return { ...prev, email: e.target.value } })
                        }} />
                      </div>

                    </div>
                    <div class="col-md-6 mb-4 pb-2">

                      <div class="form-outline">
                        <label class="form-label" for="phoneNumber">Phone Number</label>
                        <input type="tel" id="phoneNumber" class="form-control form-control-lg" onChange={(e) => {
                          setFormData((prev) => { return { ...prev, phone: e.target.value } })
                        }} />
                      </div>

                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">

                      <div class="form-outline">
                        <label class="form-label" for="password">password</label>
                        <input type="password" id="password" class="form-control form-control-lg" onChange={(e) => {
                          setFormData((prev) => { return { ...prev, password: e.target.value } })
                        }} />
                      </div>

                    </div>
                    <div class="col-md-6 mb-4 pb-2">

                      <div class="form-outline">
                        <label class="form-label" for="confirmPassword">confirm Password</label>
                        <input type="Password" id="confirmPassword" class="form-control form-control-lg" onChange={(e) => {
                          setFormData((prev) => { return { ...prev, confirmPassword: e.target.value } })
                        }} />
                      </div>

                    </div>
                  </div>

                  <div class="col-md-6 mb-4 pb-2">

                    <div class="form-outline">
                      <label class="form-label" for="confirmPassword">Choose Your Profile Photo</label>
                      <input type="file" id="confirmPassword" class="r-50" />
                    </div>
                  </div>
                </form>
                <div class="mt-4 pt-2">
                  <input class="btn btn-primary btn-lg" type="submit" id="submitBtn" onClick={() => {
                    handleSubmit();
                  }} />
                  &nbsp; &nbsp;
                  <button className='bg-transparent' style={{ border: "0px" }} onClick={() => {
                    setMode("login")
                  }}>
                    <span style={{ color: "black" }}>Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
