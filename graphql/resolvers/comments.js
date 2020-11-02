const { UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context ) => {
            const { username } = checkAuth(context);
            if(body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment field must not be empty'
                    }
                })
            }
            const post = await Post.findById(postId);
            console.log('post', post.comments)
            if(post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            } 
            else throw new UserInputError('Post not found');
            
        }
        
    }
}
