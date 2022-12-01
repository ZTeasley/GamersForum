const mongoose = require('mongoose');
require("dotenv").config()

let MONGOURI = process.env.MONGOURI


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log(`Game On! - You're Useing the Database `))
    .catch(err => console.log(`Mission Failed! We'll Get Em' Next Time   - ${err}`))