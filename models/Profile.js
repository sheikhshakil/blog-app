//user, title, bio, link: {fb, tt}, dp, posts, bookmarks
const {Schema, model} = require('mongoose')
const User = require('./User')
// const Post = require('./Post')

const profileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    country: String,
    profilePic: {
        type: String
    },
    links: {
        facebook: String,
        github: String,
        twitter: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmark: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
})

const Profile = model('profile', profileSchema)
module.exports = Profile