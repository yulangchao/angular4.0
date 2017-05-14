// ```
// user.model.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// user.model.js may be freely distributed under the MIT license
// ```

// */app/models/user.model.js*

// ## User Model

// Note: MongoDB will autogenerate an _id for each User object created

// Grab the Mongoose module
const mongoose= require('mongoose');

// const library to hash passwords
const bcrypt= require('bcrypt-nodejs');

// Define the schema for the showcase item
let userSchema = mongoose.Schema({

  local : {
    name : String,

    username : { type : String, unique : true },

    password : String,

    email : { type : String, unique : true },

    phone: String
  },

  role : { type : String }
});

// ## Methods

// ### Generate a hash
userSchema.methods.generateHash = function(password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// ### Check if password is valid
userSchema.methods.validPassword = function(password) {

  return bcrypt.compareSync(password, this.local.password);
};

// Create the model for users and expose it to the app
module.exports = mongoose.model('User', userSchema);
