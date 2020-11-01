// schema details for mongoose
// is required handled at graphql layer

const { model, Schema } = require('mongoose');

const postSchema = new Schema ({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            crewatedAt: String,
        }
    ],
    likes: [
        {
            username: String,
            crewatedAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);