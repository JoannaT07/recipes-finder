const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ingredients = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Ingredients", Ingredients);
