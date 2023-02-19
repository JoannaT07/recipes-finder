const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ingredients = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

export default mongoose.models.Product ||
  mongoose.model("Ingredients", Ingredients);
