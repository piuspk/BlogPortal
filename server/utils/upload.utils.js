const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
require('dotenv').config();

const storage = new GridFsStorage({
    url: process.env.URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg","image/jpeg"];
        if (match.indexOf(file.mimetype) === -1)
            return `${Date.now()}-blog-${file.originalname}`;
        return {
            bucketName: 'uploads', // collection name in MongoDB
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

module.exports = upload;
