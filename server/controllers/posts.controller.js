const PostsModel = require("../model/posts.model");
const CommentModel = require('../model/comment.model');
const { User } = require("../model/user.model"); // Use destructuring here
// Function to create a post
module.exports.posts = async (req, res) => {
    console.log("post save?")
    try {
        const post = new PostsModel(req.body);
        await post.save();
        return res.status(200).json({ msg: "Post saved successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Function to get posts
module.exports.PostGet = async (req, res) => {
    let category = req.query.category;
    console.log("Received category:", category);
    let posts;
    try {
        if (category) {
            posts = await PostsModel.find({ categories: category });
        } else {
            posts = await PostsModel.find({});
        }
            
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
};
module.exports.PostById = async (req, res) => {
    const id = req.params.id;
    console.log("Received ID:", id);
    try {
        const post = await PostsModel.findById({_id:id}); 
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);     
    }
};
module.exports.UpdatePostById = async (req, res) => {
    console.log("APPLE");
    const id = req.params.id;
    console.log("Receifffved ID:", id);
    try {
        const post = await PostsModel.findById(id); 

        if(!post)
            {
                return response.status(404).json({msg:"post not found"})
            }
            const updatedata = await PostsModel.findByIdAndUpdate(id,{$set:req.body}); //$addToSet, $set
        res.status(200).json({msg:"update successfull",updatedata});
    } catch (error) {
        res.status(500).json(error);     
    }
};


module.exports.DeletePostById = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostsModel.findById(id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Delete related comments
        await CommentModel.deleteMany({ postId: id });

        // Delete the post
        await PostsModel.findByIdAndDelete(id);

        res.status(200).json({ msg: "Post and related comments deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports.toggleLike = async (req, res) => {
    if (!req.params.id || !req.user.id) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const post = await PostsModel.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        const index = post.likedBy.indexOf(userId);

        if (index === -1) {
            post.likes += 1;
            post.likedBy.push(userId);
        } else {
            post.likes -= 1;
            post.likedBy.splice(index, 1);
        }

        await post.save();
        res.status(200).json({ msg: "Like toggled successfully", likes: post.likes, likedBy: post.likedBy });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.GetUserDetails = async(req,res)=>{
    console.log("ka haal users")
    const { userIds } = req.body;

    try {
        const users = await User.find({ _id: { $in: userIds } }, 'username');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}