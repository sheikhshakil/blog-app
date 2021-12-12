//title, body, author, imaage, tags, read time, likes, dislikes, comments
const {Schema, model} = require('mongoose')
// const User = require('./User')
// const Comment = require('./Comment')

const postSchema = new Schema({
    title: {
        type: String,
        maxlength: 30,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: String
    },
    image: String,
    readTime: String,

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
})

const Post = model('post', postSchema)

module.exports = Post