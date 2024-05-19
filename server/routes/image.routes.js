
const imageController = require("../controllers/image.controller");
const upload = require('../utils/upload.utils');


module.exports = function(app) {
    app.post("/image/upload", upload.single('file'), imageController.uploadimage);
    app.get("/image/:filename", imageController.getImage);
    
};
