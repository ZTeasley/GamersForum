const Controller = require("../controllers/reminders.controller");

module.exports = app => {
    app.get('/api/all', Controller.index);
    app.get("/api/:_id", Controller.findOne)
    app.post('/api/create', Controller.create);
    app.put('/api/:_id', Controller.update);
    app.delete('/delete/:_id', Controller.delete);
    app.delete('/destroy/all', Controller.destroy);
    app.get('/find/all', Controller.findAll);
    //Comment ROutes
    app.post("/comment/:_id", Controller.addComment)
    //Post routes????
    // app.post("/post/")
    //Register
    app.post("/register", Controller.register)
    // //Login
    app.post("/login", Controller.login)
    // //Authenticate
    app.get("/user/auth", Controller.auth)
    // De-Authenticate
    app.get("/user/deauth", Controller.deAuth)
}

//============================================================================\\

// const Controller = require("../controllers/tickets.controller");

// module.exports = app => {
//     app.get('/api/all', Controller.index);
//     app.get("/api/:_id", Controller.findOne)
//     app.post('/api/create', Controller.create);
//     app.put('/api/:_id', Controller.update);
//     app.delete('/delete/:_id', Controller.delete);
// }