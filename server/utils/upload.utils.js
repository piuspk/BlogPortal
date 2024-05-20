const multer = require('multer');
const express = require("express");
const app = express();
const path = require('path');
app.use(express.static('public'));
require('dotenv').config();

const storage = multer.diskStorage({
  

    destination : (req,file,cb)=>{
        
        cb(null, 'public/images')
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }


});

const upload = multer({ storage : storage });

module.exports = upload;