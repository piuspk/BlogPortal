const { authenticate } = require("../db/jwt.config");
const comments = require("../controllers/comments.controller")
module.exports = function(app){

   app.post("/AddNewComment",comments.addComments)
   app.get("/displayComment/:id",comments.displayComment)
   app.delete("/deleteComment/:id",comments.deleteComment)
}

