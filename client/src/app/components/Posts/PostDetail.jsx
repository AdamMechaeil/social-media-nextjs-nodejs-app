import { AuthContext } from '@/app/Context/AuthContext';
import { PostsContext } from '@/app/Context/PostsContext';
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'

export const PostDetail = () => {
  const { authData } = useContext(AuthContext);
  const { getPostById,addComment } = useContext(PostsContext);
  const params = useSearchParams();
  const [post, setPost] = useState();
  const [comment,setComment]= useState({text:""});
  const [commentList,setCommentList] = useState();
  const ref=useRef();
  useEffect(() => {
    fetchPost()
  }, [])
  async function fetchPost() {
    try {
      const data = await getPostById(authData, params.get("id"));
      setPost(data?.data?.post)
      setCommentList(data?.data?.comments)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(){
    try {
      const status=await addComment(params.get("id"),comment,authData);
      if(status==200){
        ref.current.value="";
        await fetchPost();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container my-3'>
      {
        post && <div className="card shadow-lg p-5 mb-5">
          <div className="d-flex justify-content-between p-1">
            <h4>{post?.title}</h4>
          </div>
          <img id={post?._id} className="my-2" src={
            post.image
          } alt=""
          />
          <br />
          <p>{post.caption}</p>
          <div>
            {
              post?.likes?.find((post) => {
                if (post === authData.userId) {
                  return true;
                }
              })
                ? <><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg> &nbsp;  {post?.likes?.length}</>
                :
                <><svg xmlns="http://www.w3.org/2000/svg" id={post?._id} width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg> &nbsp; {post?.likes?.length}</>

            }
          </div>
          <hr />
          <div>
            {post?.tags
              ?.map((tag) => {
                return <strong>#{tag}&nbsp;</strong>;
              })}
          </div>
          <div className='my-3 p-1 d-flex'>
              <div>
              <input ref={ref} type="text" onChange={(e)=>{
                setComment(prev=>{
                  return {...prev,text:e.target.value}
                })
              }}/> &nbsp;
              <button className='btn btn-outline-success' onClick={()=>{
                handleSubmit()
              }}>Comment</button>
              </div>
              <div className='mx-5'>
                {
                  commentList?.map((ele)=>{
                    return <div className='p-2 my-1 card'>{ele.text}</div>
                  })
                }
              </div>
          </div>
        </div>
      }
    </div>
  )
}
