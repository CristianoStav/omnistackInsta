const modelPost = require('../models/Post');

module.exports = {
    async store(req, res) {
        const post = await modelPost.findById(req.params.id);

        post.likes += 1;

        await post.save();

        req.io.emmit('like', post);

        return res.json(post);
    },
};