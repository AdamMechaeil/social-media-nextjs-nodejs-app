import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './Form';
import { PostsContext } from '@/app/Context/PostsContext';
import { AuthContext } from '@/app/Context/AuthContext';

const EditPost = ({ postToBeEdited, SetMode }) => {
  const { getPostById,updatePost } = useContext(PostsContext);
  const { authData } = useContext(AuthContext);
  const ref = useRef();
  const [formData, setFormData] = useState(
    { title: "", caption: "", image: "", tags: [] }
  )

  useEffect(() => {
    fetchPostById();
  }, [])

  async function fetchPostById() {
    const result = await getPostById(authData, postToBeEdited);
    console.log(result);
    setFormData({ ...result, tags: result?.tags.join(",") })
  }

  async function handleSubmit() {
    try {

      const result=await updatePost(postToBeEdited,formData,authData);
      SetMode("view")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div><Form formData={formData} setFormData={setFormData} ref={ref} handleSubmit={handleSubmit} edit={true} /></div>
  )
}

export default EditPost