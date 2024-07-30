"use client";
import { API } from "@/Utils/constants";
import { createContext, useReducer } from "react";

let AuthData = {};

if (typeof window !== "undefined") {
  AuthData = JSON.parse(localStorage.getItem("mernSocial"));
} else {
  AuthData = {
    token: "",
    userId: "",
  };
}

async function signin(body) {
  try {
    const result = await API.post("/auth/signin", body);
    return result?.data;
  } catch (error) {
    console.log(error);
  }
}

async function signup(body) {
  try {
    const result = await API.post("/auth/signup", body);
    return result?.data;
  } catch (error) {
    console.log(error);
  }
}

async function findUserByEmail(body) {
  try {
    const result = await API.post("/auth/findUserByEmail", body);
    return result?.data;
  } catch (error) {
    console.log(error);
  }
}

async function generateOtp(id) {
  try {
    const result = await API.post(`/auth/generateOtp`, { _id: id });
    return result?.status;
  } catch (error) {
    console.log(error);
  }
}

async function verifyOtp(body) {
  try {
    const result = await API.post(`/auth/verifyOtp`, body);
    return result?.data;
  } catch (error) {
    console.log(error);
  }
}

async function forgotPassword(id,body){
  try {
    const response = await API.put(`/auth/forgotPassword/${id}`,body);
    return response?.status
  } catch (error) {
    console.log(error);
  }
}

function reducer(state, action) {
  try {
    switch (action.type) {
      case "SIGNUP":
        let newState1 = state;
        newState1 = {
          ...newState1,
          token: action.payload.token,
          userId: action.payload.userId,
        };
        localStorage.setItem("mernSocial", JSON.stringify(newState1));
        return newState1;
      case "SIGNIN":
        // let newState2 = state;
        let newState2 = {
          ...state,
          token: action.payload.token,
          userId: action.payload.userId,
        };
        localStorage.setItem("mernSocial", JSON.stringify(newState2));
        return newState2;
      case "SIGNOUT":
        let newState3 = {
          token: "",
          userId: "",
        };
        localStorage.setItem("mernSocial", JSON.stringify(newState3));
        return newState3;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, AuthData);
  return (
    <AuthContext.Provider
      value={{
        authData: state,
        dispatch,
        signin,
        signup,
        findUserByEmail,
        generateOtp,
        verifyOtp,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
