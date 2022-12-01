// const mongoose = require('mongoose');

// const postSchema = require('./post.model')

// const userShema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, "username is required"],
//         min: [3, "Min username length is 3 chars."],
//         max: [12, "Max email length is 12 chars."]
//     },
//     email: {
//         type: String,
//         required: [true, "email is required!"],
//         min: [10, "Min email length is 10 chars."],
//         max: [20, "Max email length is 20 chars."]

//     },
//     password: {
//         type: String,
//         required: [true, "password is required!"],
//         min: [8, "Min password length is 8 chars."],
//         max: [15, "Max password length is 15 chars."]
//     },
//     // phonenumber: {
//     //     type: Number
//     // },
//     // age: {
//     // type: Number
//     // },
//     // profilephoto: {
//     // type: String
//     // },
//     posts: {
//         type: [postSchema]
//     }

// })

// const User = mongoose.model('User', userShema);

// module.exports = User;







//==================================================================================================\\

const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    commenttext: {
        type: String,
    },
    datecreated: {
        type: Date
    }
})


const TicketsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        min: [3, "Min title length is 3 chars."]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Min name length is 3 chars."],
        max: [15, "Max name length is 15 chars."]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        min: [5, "Min description length is 3 chars."],
        max: [500, "Max description length is 500 chars."]

    },
    open: {
        type: Boolean

    },
    comments: [commentSchema],

    dateCreated: {
        type: Date
    },
    creator: {
        type: String,
        required: true
    }
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        min: [4, "Min Username length is 4 chars."],
        max: [20, "Max Username length is 20 chars."]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        min: [21, "Min Email length is 21 chars."],
        max: [30, "Max Email length is 30 chars."]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [8, "Min Email length is 8 chars."],
        max: [20, "Max Email length is 20 chars."]
    },
    posts: [TicketsSchema],

    datecreated: {
        type: Date
    }
})






module.exports.Comment = mongoose.model('Comment', commentSchema);

module.exports.Tickets = mongoose.model('Tickets', TicketsSchema);

module.exports.User = mongoose.model('User', userSchema);