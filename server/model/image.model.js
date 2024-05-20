const mongoose = require('mongoose')
const ImageSchema = new mongoose.Schema({
    name:String,
    image:String,
})

const ImageModel = mongoose.model("images",ImageSchema)
module.exports = ImageModel;