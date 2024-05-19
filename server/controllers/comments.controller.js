const CommentModel = require("../model/comment.model");

module.exports.addComments = async (req, res) => {
  try {
    const comment = new CommentModel(req.body);
    await comment.save();
    res.status(200).json('Comment saved successfully');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.displayComment = async (req, res) => {
    try {
      console.log("hedddllo kyo nhi")
    const comments = await CommentModel.find({ postId: req.params.id });
    console.log("comment",comments)
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.deleteComment = async (req, res) => {
    const id = req.params.id;
    try {
        const comment = await CommentModel.findById(id);
        console.log("comment id",id)

        if (!comment) {
            return res.status(404).json({ msg: "Post not found" });
        }

        await CommentModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
