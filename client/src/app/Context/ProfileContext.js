"use client";
import { createContext, useReducer } from "react";
import { API } from "@/Utils/constants";

const Profile = {
  receivedRequests: [],
  sentRequests: [],
  tribe: [],
};

async function sendFriendRequest(id, authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const response = await API.put(`/user/sendRequest/${id}`);
    return response?.status;
  } catch (error) {
    console.log(error);
  }
}

async function acceptFriendRequest(id, authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const response=await API.put(`/user/acceptFriendRequest/${id}`);

    return response?.status;


  } catch (error) {
    console.log(error);
  }
}

async function fetchAllUsers(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const response=await API.get("/user/getAllUsers")
    return response?.data?.users;
  } catch (error) {
    console.log(error);
  }
}

async function getAllReceivedRequests(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const response = await API.get("/user/getAllReceivedRequests");
    return response?.data?.requestsReceived;
  } catch (error) {
    console.log(error);
  }
}

export const ProfileContext = createContext();

function reducer(state, action) {
  try {
    switch (action.type) {
      case "GET_RECEIVED_REQUESTS":
        const newState = { ...state, receivedRequests: action.payload };
        return newState;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, Profile);
  return (
    <ProfileContext.Provider
      value={{
        Profile: state,
        dispatch,
        sendFriendRequest,
        acceptFriendRequest,
        fetchAllUsers,
        getAllReceivedRequests,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
