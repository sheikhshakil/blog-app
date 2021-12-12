//Name, email, password, profile
const { Schema, model } = require('mongoose')
//const Profile = require('./Profile')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 15
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    profilePic: {
        type: String,
        default: '/uploads/default.png'
    }
}, {
    timestamps: true
})

const User = model('user', userSchema)
module.exports = User