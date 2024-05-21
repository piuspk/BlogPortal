const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

const url = process.env.BACKEND_URL;

const conn = mongoose.createConnection(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let gfs, gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

module.exports.uploadimage = async (req, res) => {
    try {
        if (!req.file) {
            console.error('No file received');
            return res.status(404).json('File not found');
        }

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
            return res.status(404).json({ error: 'File not found' });
        }

        const readstream = gridfsBucket.openDownloadStream(file._id);
        res.set('Content-Type', file.contentType);
        readstream.pipe(res);
    } catch (error) {
        console.error('Error retrieving file:', error);
        res.status(500).json({ error: error.message });
    }
};