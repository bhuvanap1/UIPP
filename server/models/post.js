const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  post: {type: String, required:true},
  content: {type: String, required:true},
  likes: {type: Number, required:true},
  userid: { type: Number, required: true},

})
const Post = mongoose.model("Post", postSchema);

async function create(userid,title, Content) {
  const newPost = await Post.create({
    post: title,
    content: Content,
    likes: 0,
    userid: userid
  });

  return newPost;
}
async function view(id) {
    const post = await Post.findOne({"_id":id});
    if(!post) throw Error('post not found');
    return post;
  }

async function getPosts(userid) {
    return await Post.find({"userid":userid});
  }

async function updatePost(id,userpost,Content,likes) {
  const post = await Post.updateOne({"_id":id}, {$set: {post:userpost,content:Content,likes:likes}});
 
  return post;
}


async function deletePost(id) {
  await Post.deleteOne({"_id": id});
};

module.exports = { 
  create, view, updatePost, deletePost, getPosts
};
