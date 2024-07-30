import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext'
import React, { useContext, useEffect } from 'react'

const ReceivedRequest = ({fetchHandlers}) => {
  const { Profile,acceptFriendRequest } = useContext(ProfileContext);
  const {authData} = useContext(AuthContext);
  async function acceptFriendRequestHandler(id){
    try {
      const status=await acceptFriendRequest(id,authData);
      if(status==200)
        fetchHandlers();
    } catch (error) {
      
    }
  }
  return (
    <div className='my-2 p-3'>
      {
        Profile?.receivedRequests?.length == 0 ?
          <><p>No requests received</p></>
          :
          <div className='my-2'>
            {
               Profile?.receivedRequests?.map((ele) => {
                return (
                  <div className='d-flex align-items-center my-1 p-2' style={{ border: "1px solid black", borderRadius: "22px" }}>
                    <img className='me-3' src={ele.profilePicture} style={{ borderRadius: "50%", height: "100px", width: "100px" }} alt={ele.firstname.charAt(0)} />
                    <p>{ele.firstname} {ele.lastname}</p>
                    <button className='mx-3 btn btn-primary' onClick={()=>{
                      acceptFriendRequestHandler(ele._id);
                    }}>+Accept</button>
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  )
}

export default ReceivedRequest