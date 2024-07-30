import colors from "colors"
import Post from "../models/post.js";
import Comment from "../models/comment.js";

async function commentFormatter(comments){
    if(comments==undefined || comments.length==0)
        return [];

    let returnObj=[];

    for await(let item of comments){
        let comment=await Comment.findById(item);
        returnObj.push(comment);
    }

    return returnObj;
}

export const getPosts=async(req,res)=>{
    try {
        const posts=await Post.find();
        res.send({posts,msg:"All posts"})
    } catch (error) {
        console.log(error.red.bold);
    }
}

export const createPosts=async(req,res)=>{
    try {
        const {id}=req.user;
        const {title,image,caption,tags}=req.body
        const blob=new Post({title,image,caption,tags,creator:id});
        const createdPost= await blob.save();
        res.send({createdPost,msg:"Created"})
    } catch (error) {
        console.log(error);
    }
}

export const updatePost=async(req,res)=>{
    try {
        const data=await Post.findOneAndUpdate({
            _id:req.params._id,
            creator:req.user.id
        },req.body)
        res.send({data,msg:"updated"})
    } catch (error) {
        console.log(error.red.bold);
    }
}

export const deletePost=async(req,res)=>{
    try {
        await Post.findOneAndDelete({
            _id:req.params._id,
            creator:req.user.id
        })
        res.send({msg:"Deleted"})
    } catch (error) {
        console.log(error.red.bold);
    }
}

export const getPostById=async(req,res)=>{
    try {
        const post =await Post.findOne({
            _id:req.params._id
        })
        const comments=await commentFormatter(post?.comments);
        res.send({post,comments,msg:"Post"})
    } catch (error) {
        console.log(error);
    }
}

export const likePost=async(req,res)=>{
    try {
        
        const likedBy=req.user.id;
        await Post.updateOne({ _id: req.params._id }, { $push: { likes: likedBy } });
        res.send("Liked");

    } catch (error) {
        console.log(error);
    }
}

export const addComments=async(req,res)=>{
    try {
        const text=req.body.text;
        const creator=req.user.id;
        const raw=new Comment({text,creator});
        const addedComment=await raw.save();
        await Post.updateOne({ _id: req.params._id }, { $push: { comments: addedComment._id } });
        res.send("Comment Added")
    } catch (error) {
      console.log(error);  
    }
}