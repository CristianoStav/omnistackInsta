const modelPost = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            );

        fs.unlinkSync(req.file.path);

        const post = await modelPost.create({
            author,
            place,
            description,
            hashtags,
            image
        });

        req.io.emmit('post', post);

        return res.json(post);
    },

    async get(req, res) {
        const posts = await modelPost.find().sort('-createdAt');

        return res.json(posts);
    }
};