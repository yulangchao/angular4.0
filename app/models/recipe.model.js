// ```
// recipe.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// recipe.model.js may be freely distributed under the MIT license
// ```

// */app/models/recipe.model.js*

// # Recipe Model

// Note: MongoDB will autogenerate an _id for each Recipe object created

// Grab the Mongoose module
const mongoose= require('mongoose');

// Create a `schema` for the `Todo` object
let recipeSchema = new mongoose.Schema({
  title: { type : String },
  tags: { type: Array },
  rating: { type: Number},
  creator: { type: String},
  description: { type : String },
  ingredients: [{
    amount: {
      type: String
    },

    unit: {
      type: String
    },

    name: {
      type: String
    }
  }],
  directions: { type: Array }
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
module.exports = mongoose.model('Recipe', recipeSchema);
