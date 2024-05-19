const { authenticate } = require("../db/jwt.config");
const postsController = require('../controllers/posts.controller');

module.exports = function(app) {
    app.post("/posts/create", authenticate, postsController.posts);
    app.get("/posts/get", postsController.PostGet);
    app.get("/getPostsById/:id", postsController.PostById);
    app.put("/updatePost/:id", postsController.UpdatePostById);
    app.delete("/deletePost/:id", authenticate, postsController.DeletePostById);
    app.post("/posts/toggleLike/:id", authenticate, postsController.toggleLike); 
    app.post("/getUserDetails", postsController.GetUserDetails)
};
