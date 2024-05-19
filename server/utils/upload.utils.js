const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/ragnar_Blog',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

const upload = multer({ storage });
module.exports = upload;
