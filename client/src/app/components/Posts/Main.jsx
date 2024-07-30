import React, { useState } from 'react'
import Lists from './Lists';
import EditPost from './EditPost';

export const Main = () => {
  const [mode,SetMode]=useState("view");
  const [postToBeEdited,setPostToBeEdited]=useState("");
  return (
   <div className="container">
      {
        mode=="view"?<Lists SetMode={SetMode} setPostToBeEdited={setPostToBeEdited}/>:<EditPost postToBeEdited={postToBeEdited} SetMode={SetMode}/>
      }
   </div>
  )
}   
