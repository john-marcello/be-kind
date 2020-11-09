const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {

        async login(
            _, { username, password }
        ) {
            const { errors, valid } = validateLoginInput(username, password);
            if(!valid) {
                throw new UserInputError('Input data is not valid.', { errors });  
            }
            const user = await User.findOne({ username });
            if(!user) {
               errors.general = 'Login or password is incorrect.';
               throw new UserInputError('Wrong credentials.', { errors });
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = 'Login or password is incorrect.';
                throw new UserInputError('Wrong Credentials.', { errors });
             }
             const token = generateToken(user);
             return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        async register(
            parent, 
            { registerInput: 
                { username, email, password, confirmed }
            }
        ) { 
            const { valid, errors } = validateRegisterInput(username, email, password, confirmed);
            if(!valid) {
                throw new UserInputError('Errors', { errors });
            };
            const user = await User.findOne({ username });
            if(user) {
                throw new UserInputError('Username is taken.', {
                    errors: {
                        username: 'This username is taken.'
                    }
                }
            )};
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};