const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post: [String],
  content: [String],
  likes: [String]
})

const Post = mongoose.model("Post", postSchema);


async function create(post) {
  const Post = await Post.create({
  post,
  });

  return post;
}
async function view(post) {
    const Post = await Post.findOne(id);
    if(!post) throw Error('post not found');
    return post;
  }




async function updatePost(content) {
  const post = await Post.updateOne({"_content": content});
  return post;
}


async function deletePost(id) {
  await Post.deleteOne({"_id": id});
};




module.exports = { 
  create, view, updatePost, deletePost 
};