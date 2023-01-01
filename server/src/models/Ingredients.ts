const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Ingredients = new Schema({
  ingredient: {
    type: String,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Ingredients", Ingredients);
