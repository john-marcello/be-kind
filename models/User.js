// schema details for mongoose
// is required handled at graphql layer

const { model, Schema } = require('mongoose');

const userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    createdAt: String
})

module.exports = model('User', userSchema);

