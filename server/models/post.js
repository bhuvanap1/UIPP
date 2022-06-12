const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post: {type: String},
  content: {type: String},
  likes: {type: String}
})

const Post = mongoose.model("Post", postSchema);

async function create(userpost, Content, likes) {

  const newPost = await Post.create({
    post: userpost,
    content: Content,
    likes: likes
  });

  return newPost;
}
async function view(id) {
    const post = await Post.findOne({"_id":id});
    if(!post) throw Error('post not found');
    return post;
  }




async function updatePost(id,userpost,Content,likes) {
  const post = await Post.updateOne({"_id":id}, {$set: {post:userpost,content:Content,likes:likes}});
 
  return post;
}


async function deletePost(id) {
  await Post.deleteOne({"_id": id});
};




module.exports = { 
  create, view, updatePost, deletePost 
};