const { Comment } = require("../models/reminders.model.js");
const { Tickets } = require("../models/reminders.model.js");
const { User } = require("../models/reminders.model.js");
const bcrypt = require('bcrypt');
const passort = require('passport');

module.exports = {

    index: (req, res) => {
        Tickets.find()
            .then(data => res.json({
                results: data
            }))
            .catch(err => res.json('Error: ' + err))
    },

    findOne: (req, res) => {
        Tickets.findById({ _id: req.params._id })
            .then(oneReminder => res.json(oneReminder))
            .catch(err => res.json(err))
    },

    create: (req, res) => {
        let create = req.body;
        create.creator = req.user.username
        Tickets.create(create)
            .then(data => {
                User.findOne({ _id: req.user._id })
                    .then(theUser => {
                        theUser.posts.push(data);
                        console.log(theUser)
                        theUser.save()
                        res.json(theUser)
                    })
                    .catch(err => res.json('The 1st Error: ' + err))
            })
            .catch(err => res.json('The 2nd Error: ' + err))
    },

    // create: (req, res) => {
    //     Tickets.create(req.body)
    //         .then(data => {
    //             User.findOne({ _id: req.user._id })
    //                 .then(theUser => {
    //                     theUser.posts.push(data);
    //                     console.log(theUser)
    //                     theUser.save()
    //                     res.json(theUser)
    //                 })
    //                 .catch(err => res.json('The 1st Error: ' + err))
    //         })
    //         .catch(err => res.json('The 2nd Error: ' + err))
    // },

    // create: (req, res) => {
    //     Tickets.create(req.body)
    //         .then(data => res.json(data))
    //         .catch(err => res.json('Error: ' + err))
    // },

    update: (req, res) => {
        Tickets.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
            .then(data => res.json({ data }))
            .catch(err => res.json('Error: ' + err))
    },
    destroy: (req, res) => {
        Tickets.find().select("_id").exec()
            .then(allIDs => {
                console.log(allIDs)
                Tickets.deleteMany({ _id: allIDs })
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
            })
            .catch(error => console.log(error))
    },

    delete: (req, res) => {
        Tickets.findOne({ _id: req.params._id })
            .then(result => {
                console.log(result)
                User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { posts: result } })
                    .then(updatedUser => {
                        console.log(updatedUser)

                        Tickets.findOneAndDelete({ _id: req.params._id })
                            .then(final => res.json(updatedUser))
                            .catch(err => console.log(err))
                    })
                    .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    },
    // delete: (req, res) => {
    //     Tickets.deleteOne({ _id: req.params._id })
    //         .then(result => res.json(result))
    //         .catch(err => console.log(err))
    // },

    findAll: (req, res) => {

        console.log("hehehe, i was clicked c:");

        Tickets.find().select("_id").exec()
            .then(allIDs => {
                // console.log('All IDs', allIDs)
                Tickets.find({ _id: allIDs })
                    .then(result => res.json(result))

                //         // .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    },




    ////// Comment methods
    addComment: (req, res) => {
        Comment.create(req.body) //Create a new Comment Obj in MongoDB
            .then(newComment => { // Get the new obj back from callback
                Tickets.findByIdAndUpdate({ _id: req.params._id }, { $push: { "comments": newComment } }) // find ticket => add comment document to its comments array
                    .then(data => res.json(data)) // respond with a json of the updated post/ticket
                    .catch(err => console.log(err)) // catch to match every .then to log errors 
            })
            .catch(err => console.log(err))// catch to match every .then to log errors 

    },



    ////// User methods
    register: (req, res) => {
        console.log("hello")
        User.findOne({ username: req.body.username })
            .then(aUser => {
                if (aUser) res.json({ msg: "Error", Error: "Username Has Been Taken" })
                else {
                    const hash = bcrypt.hashSync(req.body.password, 10)
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    });
                    newUser.save()
                    res.json({ msg: 'Welcome To The Site' })
                }
            })
            .catch(err => res.json({ msg: "Error", Error: err }))
    },

    login: (req, res, next) => {
        passort.authenticate("local", (err, user, info) => {
            if (err) res.json({ msg: "Error (login in routes)", Error: err });
            if (!user) res.json({ msg: "Invaled Login Info... Dont Try And Hack Me Or You Will Be SDoryy", Error: err });
            else {
                req.login(user, (err) => {
                    if (err) throw err;
                    else {
                        res.json({ msg: "Authenticated" });
                        console.log(req.user);
                    }
                })
            }
        })(req, res, next)
    },

    auth: (req, res) => {
        if (!req.user) return res.json({ msg: "Error (auth in routes)", Error: "Can Not Authenticate User" });
        else {
            res.json({ user: req.user });
        }
    },

    deAuth: (req, res) => {
        req.logout(() => {
            res.json({msg: "User has been logged tf out"})
        })
    }








}

//====================================================================================================================================\\

// const Tickets = require("../models/tickets.model.js");

// module.exports = {

//     index: ( req, res ) => {
//         Tickets.find()
//             .then(data => res.json({ 
//                 results: data }))
//             .catch(err => res.json('Error: ' + err))
//     },

//     findOne: (req, res) => {
//         Tickets.findById({ _id: req.params._id })
//             .then(oneReminder => res.json( oneReminder ))
//             .catch(err => res.json( err ))
//     },

//     create: ( req, res ) => {
//         Tickets.create( req.body )
//             .then(data => res.json( data ))
//             .catch(err => res.json('Error: ' + err))
//     },

//     update: ( req, res ) => {
//         Tickets.findOneAndUpdate({_id: req.params._id}, req.body, { new: true, runValidators: true} )
//             .then(data => res.json({ data }))
//             .catch(err => res.json('Error: ' + err))
//     },

//     delete: (req , res ) => {
//         Tickets.deleteOne({_id: req.params._id})
//             .then(result => res.json(result))
//             .catch(err => console.log(err))
//     }
//