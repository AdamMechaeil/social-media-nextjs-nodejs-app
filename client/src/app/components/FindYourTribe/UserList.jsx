import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext'
import React, { useContext, useEffect, useState } from 'react'

export const UserList = () => {
  const { authData } = useContext(AuthContext);
  const { fetchAllUsers,sendFriendRequest } = useContext(ProfileContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchHandler()
  }, [])

  async function fetchHandler() {
    try {
      const data = await fetchAllUsers(authData);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendFriendRequestHandler(id){
    try {
      const status=await sendFriendRequest(id,authData)
      if(status==200)
        fetchHandler()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='my-2 p-2'>
      {
        users?.length == 0 ?
          <><p>Nothing to Show</p></>
          :
          <>
            {
              users?.map((ele) => {
                return (
                  <div className='d-flex align-items-center my-1 p-2' style={{ border: "1px solid black", borderRadius: "22px" }}>
                    <img className='me-3' src={ele.profilePicture} style={{ borderRadius: "50%", height: "100px", width: "100px" }} alt={ele.firstname.charAt(0)} />
                    <p>{ele.firstname} {ele.lastname}</p>
                    <button className='mx-3 btn btn-primary' onClick={()=>{
                      sendFriendRequestHandler(ele._id);
                    }}>+Add Friend</button>
                  </div>
                )
              })
            }
          </>
      }
    </div>
  )
}
