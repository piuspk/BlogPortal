const grid = require('gridfs-stream');
const mongoose = require('mongoose');
require("dotenv").config();

const url = process.env.BASE_URL;

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
});

module.exports.uploadimage = async (req, res) => {
    try {
        if (!req.file) {
            console.error("No file received");
            return res.status(404).json("File not found");
        }

        console.log("File received:", req.file);

        const imageUrl = `${url}/image/${req.file.filename}`;
        res.status(200).json(imageUrl);
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        if (!file) {
            return res.status(404).json({ msg: 'File not found' });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
