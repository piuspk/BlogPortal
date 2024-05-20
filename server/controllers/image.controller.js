const ImageModel = require("../model/image.model");
require("dotenv").config();
const url = process.env.BACKEND_URL;
module.exports.uploadimage = async (req, res) => {
    try {
        if (!req.file) {
            console.error('No file received');
            return res.status(404).json('File not found');
        }

        const imageData = await ImageModel.create({ name: req.file.originalname, image: req.file.filename });

        if (!imageData) {
            console.error('Image data not created');
            return res.status(500).json({ error: 'Error creating image data' });
        }

        const imageUrl = `${url}/images/${req.file.filename}`;
        res.status(200).json(imageUrl);
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getImage = async (req, res) => {
    try {
        const data = await ImageModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
